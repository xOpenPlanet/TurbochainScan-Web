var straddress='';$(function(){$("[rel='tooltip']").tooltip({html:true});});var hash=window.location.hash.substring(1);$(document).ready(function(){if(hash!=''){activaTab(hash);}
var Web3=require('web3');var web3=new Web3();var mainaddress=document.getElementById("mainaddress");mainaddress.innerHTML=web3.toChecksumAddress(mainaddress.innerHTML);straddress=mainaddress.innerHTML;var icon=document.getElementById('icon');icon.style.backgroundImage='url('+blockies.create({seed:straddress.toLowerCase(),size:8,scale:16}).toDataURL()+')'});function activaTab(tab){if(tab.indexOf('comment')>=0){tab='comments';loaddisqus();}else if(tab.indexOf('readContract')>=0){loadIframeSource();}else if(tab.indexOf('tokentxns')>=0){loadIframeSource2();};$('.nav-tabs a[href="#'+tab+'"]').tab('show');};var xQRCodeCreated=false;$("#target").click(function(){showQRCodeBox()});function showQRCodeBox(){document.getElementById("qraddress").innerHTML=straddress;if(xQRCodeCreated==false){var qrcode=new QRCode("qrcode",{text:straddress,width:235,height:235,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});};xQRCodeCreated=true;$('#myModal').modal('show');}
var currentmode='hex';var orival=document.getElementById('dividcode').innerHTML;var decodedval='';function getDecodedCode(strval,strUrl){var strResult=' ... Processing ....';var url;url=strUrl+'/api?module=opcode&action=getopcode&address='+strval;$.ajax({url:url,type:"GET",async:false,cache:true,dataType:"json",success:function(result){strResult=result.result;},error:function(data){console.log('Error in [getDecodedCode]');},})
return strResult;}
function convertstr(strval){if(currentmode=='hex'){if(decodedval==''){tmpval=getDecodedCode(strval,strURL);decodedval=tmpval;}else{tmpval=decodedval;}
document.getElementById('dividcode').innerHTML="<pre class='wordwrap'>"+tmpval+"</pre>";document.getElementById('ContentPlaceHolder1_btnconvert222').innerHTML='Switch Back To Bytecodes View';currentmode='asc';}else{document.getElementById('dividcode').innerHTML=orival;document.getElementById('ContentPlaceHolder1_btnconvert222').innerHTML='Switch To Opcodes View';currentmode='hex'}}
function showopcodesforverifiedcontract(){if(currentmode=='hex'){if(decodedval==''){tmpval=getDecodedCode(straddress,strURL);decodedval=tmpval;orival=document.getElementById('verifiedbytecode2').innerHTML;}else{tmpval=decodedval;}
document.getElementById('verifiedbytecode2').innerHTML=tmpval;document.getElementById('btnConvert3').innerText='Switch Back To Bytecodes View';currentmode='asc';}else{document.getElementById('verifiedbytecode2').innerHTML=orival;document.getElementById('btnConvert3').innerText='Switch To Opcodes View';currentmode='hex';}}
var disqusloaded=false;function loaddisqus(){if(disqusloaded==false){var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='//'+disqus_shortname+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);disqusloaded=true;}
updatehash('comments');}
function updatehash(strhash){if(strhash==''){history.replaceState("",document.title,window.location.pathname);}else{var baseUrl=window.location.href.split('#')[0];history.replaceState("",document.title,baseUrl+'#'+strhash);}}
var readContractLoaded=false;function loadIframeSource(){if(readContractLoaded==false){readContractLoaded=true;document.getElementById('readcontractiframe').src='/readContract?a='+litreadContractAddress+'&v='+litContractABIAddressCode;}else{document.getElementById("overlay").style.display="none";}}
var tokenPageLoaded=false;function loadIframeSource2(){if(tokenPageLoaded==false){tokenPageLoaded=true;document.getElementById('tokenpageiframe').src='/address-tokenpage?a='+litreadContractAddress;}}
function copySourceCodeBtn(){try{var editor=ace.edit("editor");var sel=editor.selection.toJSON();editor.selectAll();editor.focus();document.execCommand('copy');editor.selection.fromJSON(sel);alert('Source code copied to clipboard');}catch(err){console.log('Oops, unable to copy');}}