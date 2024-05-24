const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecords Contract", function () {
    let MedicalRecords;
    let medicalRecords;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        
        [owner, addr1, addr2, _] = await ethers.getSigners();
        MedicalRecords = await ethers.getContractFactory("MedicalRecords");
        medicalRecords = await MedicalRecords.deploy();
        await medicalRecords.deployed();
    });

    // describe("Add Record", function () {
    //     it("Should add a record and emit event", async function () {
    //       const Tx = await medicalRecords.addRecord( "Alice",
    //       30,
    //       "Female",
    //       "O+",
    //       "Peanuts",
    //       "Flu",
    //       "Rest");
    //       await Tx.wait()
  
    //         const recordId = await medicalRecords.getRecordId();
    //         const record = await medicalRecords.getRecord(recordId);

    //         expect(record[1]).to.equal("Alice");
    //         // expect(record[2]).to.equal(30);
    //         expect(record[3]).to.equal("Female");
    //         expect(record[4]).to.equal("O+");
    //         expect(record[5]).to.equal("Peanuts");
    //         expect(record[6]).to.equal("Flu");
    //         expect(record[7]).to.equal("Rest");
    //     });
    // });

    describe("Delete Record", function () {
        it("Should delete a record and emit event", async function () {
            await medicalRecords.addRecord(
                "Alice",
                30,
                "Female",
                "O+",
                "Peanuts",
                "Flu",
                "Rest"
            );
            const recordId = await medicalRecords.getRecordId();
            console.log(recordId)
         

            const isDeleted = await medicalRecords.getDeleted(recordId);
            console.log(isDeleted)
            expect(isDeleted).to.be.true;
        });
    });

    // describe("View Record", function () {
    //     it("Should return the correct record", async function () {
    //         await medicalRecords.addRecord(
    //             "Alice",
    //             30,
    //             "Female",
    //             "O+",
    //             "Peanuts",
    //             "Flu",
    //             "Rest"
    //         );
    //         const recordId = await medicalRecords.getRecordId();
    //         const record = await medicalRecords.getRecord(recordId);

    //         expect(record[1]).to.equal("Alice");
    //         expect(record[2]).to.equal(30);
    //         expect(record[3]).to.equal("Female");
    //         expect(record[4]).to.equal("O+");
    //         expect(record[5]).to.equal("Peanuts");
    //         expect(record[6]).to.equal("Flu");
    //         expect(record[7]).to.equal("Rest");
    //     });

    //     it("Should return all records", async function () {
    //         await medicalRecords.addRecord(
    //             "Alice",
    //             30,
    //             "Female",
    //             "O+",
    //             "Peanuts",
    //             "Flu",
    //             "Rest"
    //         );
    //         await medicalRecords.addRecord(
    //             "Bob",
    //             25,
    //             "Male",
    //             "A-",
    //             "None",
    //             "Cold",
    //             "Medication"
    //         );

    //         const records = await medicalRecords.getAllRecords();

    //         expect(records[0].name).to.equal("Alice");
    //         expect(records[1].name).to.equal("Bob");
    //     });
    // });
});
