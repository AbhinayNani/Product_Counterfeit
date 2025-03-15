App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {
        // Load the contract artifact (JSON file from Truffle compilation)
        $.getJSON('PatentRegistry.json', function(data) {
            var patentArtifact = data;
            App.contracts.patent = TruffleContract(patentArtifact);
            App.contracts.patent.setProvider(App.web3Provider);
        }).fail(function() {
            console.log("Error: Could not load contract artifact.");
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-register', App.verifyPatent);
    },

    verifyPatent: function(event) {
        event.preventDefault();

        // Get the patent number input by the user
        var patentNumber = document.getElementById('patentnumber').value.trim();
        if (!patentNumber) {
            alert("Please enter a valid patent number.");
            return;
        }

        var patentInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
                return;
            }

            // Ensure there is at least one account
            if (!accounts || accounts.length === 0) {
                alert("No accounts found. Please ensure MetaMask is unlocked.");
                return;
            }

            var account = accounts[0];

            // Interact with the contract
            App.contracts.patent.deployed().then(function(instance) {
                patentInstance = instance;

                // Call the smart contract to verify the patent
                return patentInstance.verifyPatent(patentNumber);
            }).then(function(result) {
                var isValid = result[0];  // true or false
                var filingDate = result[1];
                var inventorsName = result[2];
                var owner = result[3];

                // Display results
                var logdata = document.getElementById('logdata');
                if (isValid) {
                    logdata.innerHTML = `
                        <tr>
                            <td>${patentNumber}</td>
                            <td>${filingDate}</td>
                            <td>${inventorsName}</td>
                            <td>${owner}</td>
                        </tr>
                    `;
                } else {
                    logdata.innerHTML = `
                        <tr>
                            <td colspan="4">Patent not found.</td>
                        </tr>
                    `;
                }

                // Optionally, display the user's account address
                document.getElementById('add').innerHTML = account;

            }).catch(function(err) {
                console.log("Error in contract interaction:", err.message);
                alert("Error occurred while verifying patent.");
            });
        });
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
