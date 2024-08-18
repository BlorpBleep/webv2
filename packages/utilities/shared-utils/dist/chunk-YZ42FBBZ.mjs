// src/dates.ts
function getGregorianYearOffset(identifier) {
  switch (identifier) {
    case "buddhist":
      return 543;
    case "ethiopic":
    case "ethioaa":
      return -8;
    case "coptic":
      return -284;
    case "hebrew":
      return 3760;
    case "indian":
      return -78;
    case "islamic-civil":
    case "islamic-tbla":
    case "islamic-umalqura":
      return -579;
    case "persian":
      return 622;
    case "roc":
    case "japanese":
    case "gregory":
    default:
      return 0;
  }
}

export {
  getGregorianYearOffset
};
