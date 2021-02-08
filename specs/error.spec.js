const { expect } = require('chai');
const browser = require("../bootstrap");
const { setPageObj, setParkingLot, setDateTime, elementClick, getElementText } = require('../element');
let pageObj;

describe('Error scenarios ->', async () => {

    /* on load() domain and headless (true/false) should pass as parameters */
    before(async () => {
        pageObj = await browser.load('https://www.shino.de/parkcalc/', true);
        await setPageObj( pageObj );
        await setParkingLot('#ParkingLot', 'Valet');
    });

    /* close the browser instance after test test execution */
    after(async () => { 
        await pageObj.close()
    });

    // field vaidation should trigger when add random text on date
    it('enter random text for date field', async () => { 

        await setDateTime('#StartingDate', 'ralph');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 0');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 0 Minutes)');
        
    });

    // field vaidation should trigger when add random text on time
    it('enter random text for time field', async () => { 

        await setDateTime('#StartingDate', '02/06/2021');
        await setDateTime('#StartingTime', 'random');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 0');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 0 Minutes)');
        
    });

    // field vaidation should trigger for empty date field
    it('empty date field', async () => { 

        await setDateTime('#StartingDate', '02/06/2021');
        await setDateTime('#StartingTime', 'random');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 0');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 0 Minutes)');
        
    });

    // field vaidation should trigger for empty time field
    it('empty time field', async () => { 

        await setDateTime('#StartingDate', '02/06/2021');
        await setDateTime('#StartingTime', 'random');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 0');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 0 Minutes)');
        
    });

    // vaidation should trigger same date and time for both starting and leaving
    it('same date and time for both starting and leaving', async () => { 

        await setDateTime('#StartingDate', '02/06/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 0');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 0 Minutes)');
        
    });

    
});