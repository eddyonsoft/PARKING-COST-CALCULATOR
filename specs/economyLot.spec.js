const { expect } = require('chai');
const browser = require("../bootstrap");
const { setPageObj, setParkingLot, setDateTime, elementClick, getElementText } = require('../element');
let pageObj;

describe('Economy Lot Parking ->', async () => {

    /* on load() domain and headless (true/false) should pass as parameters */
    before(async () => {
        pageObj = await browser.load('https://www.shino.de/parkcalc/', true);
        await setPageObj( pageObj );
    });

    /* close the browser instance after test test execution */
    after(async () => { 
        await browser.close();
    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 13.30 PM (1/2 hour duration)
    it('calculate cost for 1/2 hour', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '13.30');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');
        
        expect(cost).to.equal('$ 0.00');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 30 Minutes)');
        
    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 14.00 PM (1 hours duration)
    // total for 1 hour = per hour $2
    it('calculate cost for 1 hour', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '14.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 2.00');
        expect(duration.trim()).to.equal('(0 Days, 1 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 16.00 PM (3 hours duration)
    // total for 3 hour = per hour $2 * 3
    it('calculate cost for 3 hour', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '16.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 6.00');
        expect(duration.trim()).to.equal('(0 Days, 3 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 13.00 PM - to 02/06/2021 13.00 PM (24 hours duration)
    // total for 24 hour = $9
    it('calculate cost for 24 hours', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');
        
        expect(cost).to.equal('$ 9.00');
        expect(duration.trim()).to.equal('(1 Days, 0 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 15.00 PM - to 02/12/2021 15.00 PM (7 days duration)
    // total for 7 days = $54
    it('calculate cost for 7 days', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '15.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/12/2021');
        await setDateTime('#LeavingTime', '15.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');
        
        expect(cost).to.equal('$ 54.00');
        expect(duration.trim()).to.equal('(7 Days, 0 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 15.00 PM - to 02/12/2021 16.00 PM (7 days and 1 hour duration)
    // total for 7 days = $54 + per hour $2
    it('calculate cost for 7 days and 1 hour', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '15.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/12/2021');
        await setDateTime('#LeavingTime', '15.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');
        
        expect(cost).to.equal('$ 56.00');
        expect(duration.trim()).to.equal('(7 Days, 0 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 15.00 PM - to 02/14/2021 15.00 PM (9 days duration)
    // total for 7 days = for 7 days $54 + $9 * 2
    it('calculate cost for more than 7 days', async () => { 

        await setParkingLot('#ParkingLot', 'Economy');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '15.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/14/2021');
        await setDateTime('#LeavingTime', '15.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');
        
        expect(cost).to.equal('$ 72.00');
        expect(duration.trim()).to.equal('(9 Days, 0 Hours, 0 Minutes)');
        
    });
});