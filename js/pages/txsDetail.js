(function ($) {

     $("#myheader").load("./common/header2.htm")
	  var hash = $.getUrlParam('hash')
	   
	   if(hash !=null ){
	       getBlockList(hash)
	   }
         function getBlockList(hash){
            $.ajax({
                    type:"POST",
                    url:server_ip+"/tx_brief_info",
                    dataType:"json",
                    data:{
                           hash: hash,
						 
                           },
                    error:function(request) { 
                        console.log(request);
                        alert("请求错误,请稍后重试");
                    },
					
                    success:function(data) {
                        console.log(data)
						$("#blockHeight").empty();
						$("#blockHeight").append( "<a href=block_overview.htm?number="+data.data.result.blockHeight+" >"+
						data.data.result.blockHeight+"</a> ("+
                        " <span title='No of Blocks Mined Since'>32 block confirmations</span>))");
						
						$("#fee").empty();
						$("#fee").text(data.data.result.fee);
						
						$("#from").empty();
						$("#from").attr('href','address.htm?address='+data.data.result.from);
						$("#from").text(data.data.result.from);
						
						$("#to").empty();
						if(data.data.result.type!=1) {
						   $("#tocon").prepend("Contract ")
						   $("#to").text(data.data.result.to);
						   
					    } else {
						 $("#to").text(data.data.result.to);
						}
						$("#to").attr("href",'address.htm?address='+data.data.result.to)
						if(data.data.result.type==3) {
						    $("#tocon").append("Created")
						}
						
						$("#value").empty();
						$("#value").append(data.data.result.value+" 能量币");
						
						$("#gasLimit").empty();
						$("#gasLimit").text(data.data.result.gasLimit);
						
						//$("#gasPrice").empty();
						//$("#gasPrice").append(data.data.result.gasPrice+" 能量币");
						
						$("#gasUsedByTxn").empty();
						$("#gasUsedByTxn").text(data.data.result.gasUsedByTxn);
						
						$("#inputdata").empty();
						$("#inputdata").text(data.data.result.inputData);
						
						$("#nonce").empty();
						$("#nonce").text(data.data.result.nonce);
						
						$("#timeStamp").empty();
						$("#timeStamp").text(data.data.result.timeStamp);
						
						$("#txHash").empty();
						$("#txHash").text(data.data.result.txHash);
						
						$("#txReceiptStatus").empty();
						$("#txReceiptStatus").append("<font color='green'>"+data.data.result.txReceiptStatus+"</font>");
						
						$(".newTitle").empty();
						$(".newTitle").text(data.data.result.txHash);
                    }
                })
			}
        })(jQuery);