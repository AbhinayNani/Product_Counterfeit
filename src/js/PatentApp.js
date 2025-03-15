// App = {
//   web3Provider: null,
//   contracts: {},

//   init: async function() {
//     return await App.initWeb3();
//   },

//   initWeb3: function() {
//     if (window.ethereum) {
//       App.web3Provider = window.ethereum;
//       window.ethereum.enable().catch((error) => {
//         console.error("User denied account access");
//       });
//     } else if (window.web3) {
//       App.web3Provider = window.web3.currentProvider;
//     } else {
//       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//     }

//     web3 = new Web3(App.web3Provider);
//     return App.initContract();
//   },

//   initContract: function() {
//     $.getJSON('PatentRegistry.json', function(data) {
//       const patentArtifact = data;
//       App.contracts.patent = TruffleContract(patentArtifact);
//       App.contracts.patent.setProvider(App.web3Provider);
//       App.bindEvents();
//     }).fail(function() {
//       console.error("Error loading contract ABI.");
//     });
//   },

//   bindEvents: function() {
//     $(document).on('click', '.btn-register', function(event) {
//       var patentNumber = $('#patentnumber').val();  
//       App.verifyPatent(patentNumber); 
//     });
//   },

//   verifyPatent: async function(patentNumber) {
//     console.log("Verifying patent with number:", patentNumber);

//     try {
//       // Ensure the contract is properly initialized
//       const patentInstance = await App.contracts.patent.deployed();
//       console.log("Contract instance:", patentInstance);

//       // Call the verifyPatent method
//       const result = await patentInstance.verifyPatent(patentNumber);
//       console.log("Contract result:", result);

//       // Destructure the returned result
//       const [exists, filingDate, inventorsName] = result;
//       console.log("Exists:", exists);
//       console.log("Filing Date:", filingDate);
//       console.log("Inventor's Name:", inventorsName);

//       // Check and handle the result
//       if (exists) {
//         document.getElementById("logdata").innerHTML = `
//           <tr>
//             <td>${patentNumber}</td>
//             <td>${filingDate}</td>
//             <td>${inventorsName}</td>
//             <td>Not Available</td>  <!-- No address in the updated contract -->
//           </tr>
//         `;
//       } else {
//         console.log("Patent not found");
//         alert("Patent not found in the registry!");
//       }
//     } catch (error) {
//       console.error("Error fetching patent data:", error);
//       alert("Error fetching patent data. Please check the console for more details.");
//     }
//   }
// };

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });

