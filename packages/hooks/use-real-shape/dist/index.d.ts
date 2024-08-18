import { RefObject } from 'react';
import { ShapeType } from '@nextui-org/react-utils';

type ShapeResult = [ShapeType, () => void];
declare function useRealShape<T extends HTMLElement>(ref: RefObject<T | null>): ShapeResult;
type UseRealShapeReturn = ReturnType<typeof useRealShape>;

export { ShapeResult, UseRealShapeReturn, useRealShape };
