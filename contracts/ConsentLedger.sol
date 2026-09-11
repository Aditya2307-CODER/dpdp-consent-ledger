// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ConsentLedger {
    mapping(bytes32 => mapping(string => bool)) private consentStatus;

    event ConsentUpdated(
        bytes32 indexed userHash,
        string purposeId,
        bool status,
        uint256 timestamp
    );

    function updateConsent(
        bytes32 _userHash,
        string memory _purposeId,
        bool _status
    ) public {
        consentStatus[_userHash][_purposeId] = _status;
        emit ConsentUpdated(_userHash, _purposeId, _status, block.timestamp);
    }

    function checkConsent(
        bytes32 _userHash,
        string memory _purposeId
    ) public view returns (bool) {
        return consentStatus[_userHash][_purposeId];
    }
}
