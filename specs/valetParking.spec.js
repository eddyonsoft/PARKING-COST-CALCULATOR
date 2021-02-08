const { expect } = require('chai');
const browser = require("../bootstrap");
const { setPageObj, setParkingLot, setDateTime, elementClick, getElementText } = require('../element');
let pageObj;

describe('Valet Parking ->', async () => {

     /* on load() domain and headless (true/false) should pass as parameters */
    before(async () => {
        pageObj = await browser.load('https://www.shino.de/parkcalc/', true);
        await setPageObj( pageObj );
    });

    /* close the browser instance after test test execution */
    after(async () => { 
        await browser.close();
    });

    // from 02/05/2021 13.00 PM - to 02/06/2021 13.00 PM (24 hours duration)
    it('calculate per day cost', async () => { 

        await setParkingLot('#ParkingLot', 'Valet');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '13.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 18.00');
        expect(duration.trim()).to.equal('(1 Days, 0 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 14.00 PM - to 02/05/2021 19.00 PM (5 hours duration)
    it('calculate cost for 5 hours duration', async () => { 

        await setParkingLot('#ParkingLot', 'Valet');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '14.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '19.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 12.00');
        expect(duration.trim()).to.equal('(0 Days, 5 Hours, 0 Minutes)');
        
    });

    // from 02/05/2021 14.00 PM - to 02/05/2021 18.59 PM (4 hours and 59 mins duration)
    it('calculate cost for duration less than 5 hours', async () => { 

        await setParkingLot('#ParkingLot', 'Valet');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '14.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '18.59');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 12.00');
        expect(duration.trim()).to.equal('(0 Days, 4 Hours, 59 Minutes)');
        
    });

    // from 02/05/2021 14.00 PM - to 02/05/2021 19.01 PM (5 hours and 01 mins duration)
    // requirment for this scenario is not clear in the spec where 24H < duration > 5H.
    // test is written assuming cost is $12 
    it('calculate cost for duration more than 5 hours', async () => { 

        await setParkingLot('#ParkingLot', 'Valet');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '14.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '19.01');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 12.00');
        expect(duration.trim()).to.equal('(0 Days, 5 Hours, 01 Minutes)');
        
    });

    // from 02/05/2021 13.00 PM - to 02/06/2021 14.00 PM (1 day and 1 hour duration)
    // requirment for this scenario is not clear in the spec where duration > 24H.
    // test is written assuming cost is $18x2 
    it('calculate cost for duration more than 24 hours', async () => { 

        await setParkingLot('#ParkingLot', 'Valet');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '14.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 36.00');
        expect(duration.trim()).to.equal('(1 Days, 1 Hours, 0 Minutes)');
        
    });
});