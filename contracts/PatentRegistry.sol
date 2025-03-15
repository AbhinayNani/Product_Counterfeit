// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PatentRegistry {
    struct Patent {
        string patentNumber;
        string title;
        string filingDate;
        string inventorsName;
        address owner;
    }

    mapping(string => Patent) private patents;

    event PatentRegistered(string patentNumber, string title, string filingDate, string inventorsName, address owner);

    function registerPatent(
        string memory _patentNumber,
        string memory _title,
        string memory _filingDate,
        string memory _inventorsName
    ) public {
        require(bytes(patents[_patentNumber].patentNumber).length == 0, "Patent already exists!");

        patents[_patentNumber] = Patent({
            patentNumber: _patentNumber,
            title: _title,
            filingDate: _filingDate,
            inventorsName: _inventorsName,
            owner: msg.sender
        });

        emit PatentRegistered(_patentNumber, _title, _filingDate, _inventorsName, msg.sender);
    }

    function verifyPatent(string memory _patentNumber) 
        public 
        view 
        returns (bool, string memory, string memory, string memory, address) 
    {
        if (bytes(patents[_patentNumber].patentNumber).length > 0) {
            return (
                true, 
                patents[_patentNumber].title, 
                patents[_patentNumber].filingDate, 
                patents[_patentNumber].inventorsName, 
                patents[_patentNumber].owner
            );
        }
        return (false, "", "", "", address(0));
    }
}
