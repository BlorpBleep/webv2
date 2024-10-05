// File: handlers/priceSyncHandler.ts

import { stripe } from '@/utils/stripeClient';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Database } from '@/types/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Synchronizes Stripe products and their associated prices with Supabase.
 */
export async function syncStripeProductsAndPrices() {
  try {
    console.log('>>> Starting synchronization of Stripe products and prices.');

    // Fetch all active products from Stripe
    const products = await stripe.products.list({
      active: true,
      limit: 100, // Adjust as needed
    });

    for (const product of products.data) {
      // Upsert product into Supabase
      const supabaseProduct: Database['public']['Tables']['products']['Insert'] = {
        id: product.id,
        active: product.active,
        description: product.description || null,
        EAN: product.metadata.EAN || null, // Assuming EAN is stored in metadata
        image: product.images && product.images.length > 0 ? product.images[0] : null,
        ltr_order: product.metadata.ltr_order ? parseInt(product.metadata.ltr_order, 10) : null,
        metadata: product.metadata || {},
        name: product.name || null,
      };

      const { data: upsertedProduct, error: productError } = await supabaseAdmin
        .from('products')
        .upsert(supabaseProduct, { onConflict: 'id' });

      if (productError) {
        console.error(`Failed to upsert product ${product.id}:`, productError.message);
        continue; // Skip to the next product
      }

      console.log(`Product ${product.id} synchronized successfully.`);

      // Fetch prices for the current product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 100, // Adjust as needed
      });

      for (const price of prices.data) {
        const supabasePrice: Database['public']['Tables']['prices']['Insert'] = {
          id: price.id,
          product_id: product.id,
          active: price.active,
          unit_amount: price.unit_amount || null,
          currency: price.currency || null,
          type: price.type as Database['public']['Enums']['pricing_type'],
          interval: price.recurring?.interval || null,
          interval_count: price.recurring?.interval_count || null,
          trial_period_days: price.recurring?.trial_period_days || null,
          metadata: price.metadata || {},
        };

        const { data: upsertedPrice, error: priceError } = await supabaseAdmin
          .from('prices')
          .upsert(supabasePrice, { onConflict: 'id' });

        if (priceError) {
          console.error(`Failed to upsert price ${price.id}:`, priceError.message);
          continue; // Skip to the next price
        }

        console.log(`Price ${price.id} synchronized successfully.`);
      }
    }

    console.log('>>> Completed synchronization of Stripe products and prices.');
  } catch (error) {
    console.error('Error during synchronization of Stripe products and prices:', error);
  }
}