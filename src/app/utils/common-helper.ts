export class CommonHelper {
  // TODO: Use generics
  public static filterObjectArray(
    targetArray: any[],
    filterParams: any
  ): any[] {
    let filterKeys = Object.keys(filterParams);

    return targetArray.filter((obj) => {
      return filterKeys.every((key) => {
        if (
          filterParams[key] === '' ||
          filterParams[key] === undefined ||
          filterParams[key] === null
        ) {
          return true;
        }

        return filterParams[key] === obj[key];
      });
    });
  }
}
