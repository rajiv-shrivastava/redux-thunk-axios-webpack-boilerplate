const productActions = require("./productActions")
// @ponicode
describe("productActions.fetchUsers", () => {
    test("0", () => {
        let callFunction = () => {
            productActions.fetchUsers()
        }
    
        expect(callFunction).not.toThrow()
    })
})
