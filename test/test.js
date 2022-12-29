var assert = require('assert');
var ref = require('../purchaseOrder')

describe('purchaseOrder.js STATEMENT AND BRANCH TESTING', function() {
    describe("creditStatus", function() {
      var inputs = [
        {value: -1, value2: "", expected: "not-allowed"}, //start – 1 – 2 – 3 – end
        {value: 90, value2: "restricted", expected: "high"}, //start – 1 – 2 – 4 – 5 – 8 – 9 – end
        {value: 90, value2: "default", expected: "high"}, //start – 1 – 2 – 4 – 6 – 7 – 8 – 9 – end
        {value: 30, value2: "restricted", expected: "low"}, //start – 1 – 2 – 4 – 5 – 8 – 10 – end
        {value: 30, value2: "default", expected: "low"}, //start – 1 – 2 – 4 – 6 – 7 – 8 – 10 – end
      ]

      inputs.forEach(function (test) {
        it(`expected: ${test.expected} where creditScore=${test.value} and creditCheckMode=${test.value2}`, function() {
          var x = {}
          x.creditScore = test.value
          assert.equal(ref.creditStatus(x, test.value2), test.expected)
        })
      })
    })

    describe("productStatus", function() {
      //start – 1 – 2 – 11 – end
      var input1 = [{items : [], threshhold: 100, name: null, expected: 'invalid'}, {items : [{name: "item1", quantity: 0}], threshhold: 100, name: null, expected: 'invalid'}, {items : [{name: "item1", quantity: 0}, {name: "item1", quantity: 0}], threshhold: 100, name: null, expected: 'invalid'}]
      //start – 1 – 2 – 3 – 5 – 6 – 7 – end
      var input2 = [{items: [{name: "item", quantity: 0}], threshhold: 100, name: "item", expected: "soldout"},  {items: [{name: "item1", quantity: 0}, {name: "item", quantity: 0}], threshhold: 100, name: "item", expected: "soldout"}, {items: [{name: "item1", quantity: 0}, {name: "item2", quantity: 0}, {name: "item", quantity: 0}], threshhold: 100, name: "item", expected: "soldout"}, ]
      //start – 1 – 2 – 3 – 4 – 2 – 3 – 5 – 6 – 8 – 9 – end 
      var input3 = [{items: [{name: "item", quantity: 200}], threshhold: 100, name: 'item', expected: 'limited'}, {items: [{name: "item_no", quantity: 200}, {name: "item", quantity: 200}], threshhold: 100, name: 'item', expected: 'limited'}, {items: [{name: "item_no", quantity: 200}, {name: "item_no", quantity: 200}, {name: "item", quantity: 200}], threshhold: 100, name: 'item', expected: 'limited'}]
      //start – 1 – 2 – 3 – 4 – 2 – 3 – 4 – 2 – 3 – 5 – 6 – 8 – 10 – end
      var input4 = [{items: [{name: 'item', quantity: 10}], threshhold: 100, name: 'item', expected: 'available-to-all'}, {items: [{name: "item_no", quantity: 10}, {name: 'item', quantity: 10}], threshhold: 100, name: 'item', expected: 'available-to-all'}, {items: [{name: "item_no", quantity: 10}, {name: 'item_no', quantity: 10}, {name: 'item', quantity: 10}], threshhold: 100, name: 'item', expected: 'available-to-all'}]

      //Input1 Path
      input1.forEach(function (test) {
        let loops = 0
        if (test.items.length === 0) {
          loops = "none";
        } else {
          loops = test.items.length - 1
        }
        it(`expected: ${test.expected} where product=${test.name} and threshold=${test.threshhold} and loops=${loops}`, function() {
          var inv = []
          for (let i=0; i < test.items.length; i++) {
            inv.push(test.items[i])
          }
          assert.equal(ref.productStatus(test.name, inv, test.threshhold), test.expected)
        })
      })
      

      //Input2 Path
      input2.forEach(function (test) {
        let loops = 0
        if (test.items.length === 0) {
          loops = "none";
        } else {
          loops = test.items.length - 1
        }
        it(`expected: ${test.expected} where product=${test.name} and threshold=${test.threshhold} and loops=${loops}`, function() {
          var inv = []
          for (let i=0; i < test.items.length; i++) {
            inv.push(test.items[i])
          }
          assert.equal(ref.productStatus(test.name, inv, test.threshhold), test.expected)
        })
      })

      //Input3 Path
      input3.forEach(function (test) {
        let loops = 0
        if (test.items.length === 0) {
          loops = "none";
        } else {
          loops = test.items.length - 1
        }
        it(`expected: ${test.expected} where product=${test.name} and threshold=${test.threshhold} and loops=${loops}`, function() {
          var inv = []
          for (let i=0; i < test.items.length; i++) {
            inv.push(test.items[i])
          }
          assert.equal(ref.productStatus(test.name, inv, test.threshhold), test.expected)
        })
      })

      //Input4 Path
      input4.forEach(function (test) {
        let loops = 0
        if (test.items.length === 0) {
          loops = "none";
        } else {
          loops = test.items.length - 1
        }
        it(`expected: ${test.expected} where product=${test.name} and threshold=${test.threshhold} and loops=${loops}`, function() {
          var inv = []
          for (let i=0; i < test.items.length; i++) {
            inv.push(test.items[i])
          }
          assert.equal(ref.productStatus(test.name, inv, test.threshhold), test.expected)
        })
      })
    })
})