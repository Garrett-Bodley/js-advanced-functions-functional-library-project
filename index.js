const unmodifiedTestArr = [1, 2, 3, 4]
const unmodifiedTestObj = {one: 1, two: 2, three: 3, four: 4}

const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if(Array.isArray(collection)){
        for (let i = 0; i < collection.length; i++){
          callback(collection[i], i, collection);
        }
      }else if(typeof(collection) === 'object' && collection != null){
        for (const key in collection){
          callback(collection[key], key, collection);
        }
      };
      return collection
    },

    map: function(collection, callback) {
      let result = [];
      if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
          result.push(callback(collection[i], i, collection));
        };
        return result;
      }else if(typeof(collection) === 'object' && collection != null){
        for(const key in collection){
          result.push(callback(collection[key], key, collection));
        };
      };
      return result;
    },

    reduce: function(collection, callback, acc) {
      if(acc === undefined){
        acc = collection[0]
        for(let i = 1; i < collection.length; i++){
          acc = callback(acc, collection[i], collection)
        }
      }else{
        for(let i = 0; i < collection.length; i++){
          acc = callback(acc, collection[i], collection)
        }
      }
      return acc
    },

    find: function(collection, predicate){
      for(const el of collection){
        if(predicate(el)){return el} 
      }
      return undefined;
    },

    filter: function(collection, predicate){
      let result = []
      for(const el of collection){
        if(predicate(el)){
          result.push(el)
        }
      }
      return result
    },

    size: function(collection){
      let size = 0;
      if(Array.isArray(collection)){
        for(const _el of collection){
          size++
        };
      }else if(typeof(collection) === 'object' && collection !== undefined){
        for(const _key in collection){
          size++
        };
      };
      return size;
    },

    first: function(collection, n){
      return n === undefined ? collection[0] : collection.slice(0, n)
    },

    last: function(collection, n){
      return n === undefined ? collection[collection.length - 1] : collection.slice(-n)
    },

    compact: function(collection){
      let result = [...collection];
      return this.filter(result, el => !!el)
    },

    sortBy: function(collection, callback){
      let result = [...collection]
      return result.sort((a, b) => {
        if(callback(a) > callback(b)){
          return 1
        }else if(callback(a) < callback(b)){
          return -1
        }else{
          return 0
        }
      });
    },

    flatten: function(collection, shallow){
      let result = []
      if(shallow === true){
        for(const el of collection){
          Array.isArray(el) ? result.push(...el) : result.push(el)
        };
      }else{
        for(const el of collection){
          Array.isArray(el) ? result.push(...this.flatten(el)) : result.push(el)
        }
      }
      return result;
    },

    uniq: function(collection, isSorted, callback){
      
      if(isSorted !== true){
        return unsortedUniq.call(this, collection);
      }else{
        return sortedUniq.call(this, collection);
      };

      function sortedUniq(collection){
        let result = [];
        if(callback === undefined){
          for(let i = 0; i < collection.length; i++){
            if(collection[i] !== collection[i + 1]){
              result.push(collection[i]);
            };
          };
          return result;
        }else{
          for(let i = 0; i < collection.length; i++){
            if(callback(collection[i]) !== callback(collection[i + 1])){
              result.push(collection[i]);
            };
          };
          return result;
        };
      };

      function unsortedUniq(collection){
        let result = [];
        if(callback === undefined){
          for(const el of collection){
            if(this.find(result, item => item === el) === undefined){
              result.push(el);
            };
          };
          return result;
        }else{
          for(const el of collection){
            let mutatedEl = callback(el);
            if(this.find(result, item => callback(item) === mutatedEl) === undefined){
              result.push(el);
            };
          };
          return result;
        };
      };
    },

    keys: function(object){
      let result = [];
      for(const key in object){
        result.push(key);
      };
      return result;
    },

    values: function(object){
      let result = [];
      for(const key in object){
        result.push(object[key]);
      };
      return result;
    },

    functions: function(object) {
      return this.filter(this.keys(object), key => typeof(object[key]) === "function").sort()
    },


  }
})()

fi.libraryMethod()
