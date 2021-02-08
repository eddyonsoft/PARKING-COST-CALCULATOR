const { expect } = require('chai');
const browser = require("../bootstrap");
const { setPageObj, setParkingLot, setDateTime, elementClick, getElementText } = require('../element');
let pageObj;

describe('Short-Term(hourly) Parking ->', async () => {

    /* on load() domain and headless (true/false) should pass as parameters */
    before(async () => {
        pageObj = await browser.load('https://www.shino.de/parkcalc/', true);
        await setPageObj(pageObj);
    });

    /* close the browser instance after test test execution */
    after(async () => {
        await browser.close();
    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 13.30 PM (1/2 hour duration)
    it('calculate cost for 1/2 hour', async () => {

        await setParkingLot('#ParkingLot', 'Short');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '13.30');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 2.00');
        expect(duration.trim()).to.equal('(0 Days, 0 Hours, 30 Minutes)');

    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 15.00 PM (2 hours duration)
    // total for 2 hour = first hour $2 + additional 1/2h $1 * 2
    it('calculate cost for 2 hour', async () => {

        await setParkingLot('#ParkingLot', 'Short');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '15.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 4.00');
        expect(duration.trim()).to.equal('(0 Days, 2 Hours, 0 Minutes)');

    });

    // from 02/05/2021 13.00 PM - to 02/05/2021 15.30 PM (2.5 hours duration)
    // total for 2.5 hour = first hour $2 + additional 1/2h $1 * 3
    it('calculate cost for 2.5 hours', async () => {

        await setParkingLot('#ParkingLot', 'Short');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '13.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/05/2021');
        await setDateTime('#LeavingTime', '15.30');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 5.00');
        expect(duration.trim()).to.equal('(0 Days, 2 Hours, 30 Minutes)');

    });

    // from 02/05/2021 14.00 PM - to 02/06/2021 14.00 PM (24 hours duration)
    // total for 24 hour = $24
    it('calculate cost for 24 hours', async () => {

        await setParkingLot('#ParkingLot', 'Short');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '14.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '14.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 24.00');
        expect(duration.trim()).to.equal('(1 Days, 0 Hours, 0 Minutes)');

    });

    // from 02/05/2021 14.00 PM - to 02/06/2021 15.00 PM (25 hours duration)
    // total for 25 hour = for 24hours $24 + additional 1/2 $1 * 2 
    it('calculate cost for duration more than 24 hours', async () => {

        await setParkingLot('#ParkingLot', 'Short');
        await setDateTime('#StartingDate', '02/05/2021');
        await setDateTime('#StartingTime', '14.00');
        await elementClick('tr:nth-child(2) > td:nth-child(2) > input:nth-child(5)');
        await setDateTime('#LeavingDate', '02/06/2021');
        await setDateTime('#LeavingTime', '15.00');
        await elementClick('tr:nth-child(3) > td:nth-child(2) > input:nth-child(5)');
        await elementClick('form:nth-child(2) > input:nth-child(3)');

        const cost = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.SubHead > b');
        const duration = await getElementText('tr:nth-child(4) > td:nth-child(2) > span.BodyCopy > b');

        expect(cost).to.equal('$ 26.00');
        expect(duration.trim()).to.equal('(1 Days, 1 Hours, 0 Minutes)');

    });
});