/*
  Name : DoubleX Library
  Short: DX
  Author: AlexYorke <yorkbc2@gmail.com>
  version: 1
  Mode: Alpha
*/


"use strict";

// List of events which we will use

const EVENTS = {
  CLICK : "click",
  MOVER : "mouseover",
  MOUT  : "mouseout",
  INPUT : "input",
  FOCUS : "focus"
}

// TimeOut short writtly function
let tout = function (callback, timeout) {
  setTimeout(callback, timeout);
}


// Function with very interesting callback
let tint = function (callback, timeout) {
  let interval = setInterval(() => {

    // callback argument is function clearInterval
    let i = clearInterval;

    // And callback argument kill this interval
    callback(i)

  }, timeout)

  return interval
};

// Function for parseInteger

let int = num => {
  return parseInt(num);
}


// Main function, which controls all process
var DX = function (context) {

  // Return a DoubleX Element with Protos
  return DoubleX.get(context);
}

// Simple list of prototypes for elements
var DoubleXProto = {

  // Class adding
  class(className, timeout) {

    // Function adding classname for timeout short write
		function adding(el) {

      // Started classname
			let started = el.className,
				spaced = started + " ",
				final  = spaced + className,
				replaced = started.replace(' ', ','),
				splited = replaced.split(','),
				hasClass = false

			for(let i = 0 ; i < splited.length ; i++) {
				if(className == splited[i]) {
					hasClass = true;
				}
			}

			if(hasClass) {
				el.className = started
			}
			else {
				el.className = final
			}


		}
		if(timeout) {
			setTimeout(() => {
				adding()
			}, timeout)
		}
		else {
			adding(this)
		}
		return this;
  },

  // Very good method for removing classnames from element
  classRemove(className) {

    // Starter className
    let started = this.className,
      cl        = className,

      // Goint to array :D
      replaced  = cl.replace(' ', ',').split(','),
      replaced2 = started.trim().replace(' ', ',').split(',');



    for(let i = 0 ; i < replaced.length ; i++) {
      let r = replaced[i];

      for(let j = 0 ; j < replaced2.length ; j++) {
        let k = replaced2[j]

        // If classNames are same - remove this
        if(r == k) {
            replaced2[j] = ''
        }
      }
    }

    let finale = ""

    // Finale = all replaced array which alive
    for(let i = 0 ; i < replaced2.length ;i++) {
      finale += replaced2[i]
    }

    this.className = finale;

    // Return this element for chain calling function
    return this;
  },

  classToggle(className) {

    let elementArray = this.className.replace(/ /, ',').trim().replace(' ', ',').split(','),
      toggleArray    = className.trim().replace(' ', ',').replace(/ /, ',').split(',');


      console.log(elementArray, toggleArray)

      let DXString = '';
      let DXArray  = [];

    let i = 0,
        j = 0 ;

    for(let i = 0 ; i < elementArray.length ; i++) {
      console.log(elementArray[i])
      for(let j = 0 ; j < toggleArray.length ; j++) {
        if(elementArray[i]==toggleArray[j]) {
          elementArray[i] = '';
          toggleArray[j] = ''
        }
      }
    }

    console.log(elementArray, toggleArray)

    DXArray = elementArray.concat(toggleArray)

    for( let i = 0 ; i < DXArray.length ; i++) {
      DXString += " " + DXArray[i]
    }

    this.className = DXString.trim();

    return this;

  }



}

// Main Object, which controls all methods and properties
var DoubleX = {

  // Get element from DOM
  get(str) {

    // Array for a lot of elements
    let middleArray = {};

    // element from DOM
    let el = document.querySelectorAll(str);

    // If length == 1 -> Element is one. Proto without loop
    if(el.length == 1) {

      // Prototyping a DoubleX Proto
      el[0] = this.proto(el[0]);
      return el[0];
    }

    // Loop for a lot of elements
    else {

      let elements = 0

      for(let i = 0 ; i < el.length ; i++) {

        elements++;

        // Protos every element
        el[i] = this.proto(el[i]);


        middleArray[i.toString()] = el[i]

      }

      // Simple length of elements
      middleArray['elements'] = elements;


      // Firstly prototyping for massive elements
      middleArray.__proto__.each = callback =>  {
        // Loop for getting every element from array


          for(let i = 0 ; i < int(middleArray.elements) ; i++) {

            // Use callback with element
            callback(middleArray[i.toString()]);
          }

        return this;
      }

      // Return array if elements.length > 1
      return middleArray;
    }
  },

  // Proto from object
  proto(el) {

    // Started proto from element
    let before = el.__proto__;

    // Doublex PROTO
    let middle = DoubleXProto;

    // Assign prototypes
    let after  = Object.assign(before, middle);

    // return our new element
    return el;
  },

  // Simple handling error message
  error(message) {

    // If !message we don't throw this
    if(!message) {
        throw Error("String is undefined in arg");
    }
    else {
      // Throwing message;
        throw Error(message);
    }
  },

  // Expand our main object DoubleXProto
  expand(funWithName) {

    // Name of new method
    let name = funWithName['name'];

    // Method;
    let fun = funWithName;


    // Method must contain name
    if(!name) {
      // Handle error
      this.error("Name is required argument")
    }

    // Expands our Proto Object with constr obj[aa] = ...
    DoubleXProto[name] = fun;

    // Return
    return DoubleXProto;
  },

  // Expand many methods;

  /*
    Something like this
      DoubleX.expands([
      function .. () {...},
      function .. () {...}
    ])

  */
  expands(functionsArray) {

    // Main array of functions
    let arr = functionsArray;

    // Loop for all elements of array
    for(let i = 0 ; i < arr.length ; i++) {
      let name = arr[i]['name'];
      let fun = arr[i];

      if(!name) {
        // Handling
        this.error("Name is required argument")
      }

      DoubleXProto[name] = fun;
    }

    // Return
    return DoubleXProto;

  }
}

DoubleX.expands([

  // To get parent element of DOM
  function parent() {

    // Proto function of main object
    let pr = DoubleX.proto;

    // Parent of the element
    let parent = this.parentNode;

    // Give to element DOUBLEX PROTO methods
    pr(parent)

    // Return parent;
    return parent;

  },
  // Same as parent
  function dad() {
    let pr = DoubleX.proto;

    let parent = this.parentNode;

    pr(parent)

    return parent;
  },

  // Method for get all chilren of element
  function childs() {

    // list of children
    let list = this.children,

    // Length of cheldren

      counter = list.length,

      // Returned object
      returned = {};

      // Some looop for pushing elements into returned object
    for(let i = 0 ; i < counter ; i++) {

      // Proto ever element
      list[i] = DoubleX.proto(list[i]);
      // return pushing
      returned[i.toString()] = list[i];
    }

    // Some method for getting element from array
    returned['eq'] = function (num) {

      // Tostring
      num = num.toString();

      return this[num];
    }

    // Loop method for getting every element of array
    returned['each'] = function (callback) {

      // Simple loop
      for(let i = 0 ; i < counter; i++) {
        callback(returned[i.toString()])
      }
    }

    returned.length = counter;

    return returned;
  }
])

DoubleX.expands([

  // Method for getting and setting attribute of element
  function attr(name, value) {

    // if in argument we have value
    let isValue = true;

    if(!value) {
      isValue = false;
    }

    let attr = this.getAttribute(name);

    if(isValue) {
      attr = this.setAttribute(name, value)
    }

    return attr;

  },

  function attrRemove(name) {
    this.removeAttribute(name);

    return this;
  }
])

// Method for creating listeners for attributes
DoubleX.attr = function (object) {

  // Tag of elements which we control
  let tag = object.tag,
  // Handler
    handler= object.handler,
    // Attribute which we find
    attr   = object.attr;

  let elements = DX(tag);

  // If element > 0
  if(elements.elements) {

    // Simple loop
    for(let i = 0 ; i< elements.elements ; i++) {

      // if attribute like attribute which we find
      if(elements[i].attr(attr)) {
        // handle this element
        elements[i].attrVal = elements[i].attr(attr)
        handler(elements[i])
      }
    }
  }

  // if ELement is single
  else {
    if(elements.attr(attr)) {
      elements.attrVal = elements.attr(attr)
      handler(elements);
    }
  }
}

// Styling methods
DoubleX.expands([
  function css (prop, value) {
    this.style[prop.toString()] = value;

    return this;
  }
])

// Event handlers
DoubleX.expands([
  // Click method
  function click (callback) {

    // our element
    let el = this;

    // Adding listener for this element
    this.addEventListener(EVENTS.CLICK, () => {

      // on click -> callback
      callback(el);
    })

  },
  // Method for event handler
  function on(eventName, handler) {
    let el = this;

    this.addEventListener(eventName, () => {
      handler(el)
    })

    return this;
  },

  // Removing event handler :D
  function off(eventName) {

    // REMOVEEE
    this.removeEventListener(eventName);

    return this;
  }
])

let Attr = {

  __proto__: DoubleX,

  styling_list: [
    {name: "border", value: "border"},
    {name: "color", value:"color"},
    {name: "transition", value:"transition"},
    {name: "display", value: "display"},
    {name: "border-bottom", value:"border-bottom" }
  ],

  method_list: [
    {name: "makeRed", event: function (el) {
      el.css('color', 'red')
    }}
  ],

  handler_list: [
  {name: "dx-click", callback: function (el, fun) {el.click(() => {fun(el)})}}

  ],

  styling(els) {

    let elements = DX(els);

    for(let i = 0 ; i < elements.elements; i++) {

      for(let j = 0 ; j < this.styling_list.length ; j++) {

        if(elements[i].attr(this.styling_list[j].name)) {

          elements[i].css(this.styling_list[j].value, elements[i].attr(this.styling_list[j].name));
          elements[i].attrRemove(this.styling_list[j].name)

        }

      }

    }

  }


  ,

  method(fun) {

    let name = fun.name;

    this.method_list.push({name: name, event: fun});

    this.event("*")

  },

  event(els) {

    let elements = DX(els);

    for(let i = 0 ; i < elements.elements ; i++) {

      for(let j = 0 ; j < this.handler_list.length ; j++) {

        for(let k = 0 ; k < this.method_list.length ; k++) {

          if(elements[i].attr(this.handler_list[j].name)) {

            if(elements[i].attr(this.handler_list[j].name) == this.method_list[k].name) {


              this.handler_list[j].callback(elements[i], this.method_list[k].event)

            }

          }

        }


      }

    }

  }

}

Attr.styling('*')
Attr.event("*")


