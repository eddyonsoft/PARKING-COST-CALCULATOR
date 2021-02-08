/**
 * from here export all the common support functions to access 
 *  DOM elements. 
 */

let page;

/** get the page object which is created while launching browser instance
 *   and assign to local variable.
 */
const setPageObj = async ( pageObject ) => {
    page = pageObject;
}

/** set parking lot option according to the given value
 */
const setParkingLot = async ( selector, value ) => {
    await page.select(selector, value);
}

/** set date and time input accrding to given element selector and value
 */
const setDateTime = async ( selector, dateTimeInput ) => {
    const startingDateInput = await page.$(selector);
    await startingDateInput.click({ clickCount: 3 });
    await startingDateInput.type(dateTimeInput);
}

/** used to click on elements (buttons and radio buttons)
 */
const elementClick = async ( selector ) => {
    await page.$eval( selector , el => el.click());
}

/** retrive text from the element
 */
const getElementText = async ( selector ) => {
    return await page.$eval( selector, el => el.textContent);
}

module.exports = { setPageObj, setParkingLot, setDateTime, elementClick, getElementText }  