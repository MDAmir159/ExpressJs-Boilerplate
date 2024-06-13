export function bulkInputInputStringGenerator(inputArray) {
    if (inputArray && inputArray.length) {
        const project_operation_relation = inputArray.map((first_value) => {
        return [first_value, second_value]
      })
    
      const inputString = project_operation_relation.map((item) => {
        return format('(%L, %L)', item[0], item[1]);
      });
    } else {
        return 
    }
    
    
}