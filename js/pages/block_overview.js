 
 (function ($) {




         $("#myheader").load("./common/header2.htm")
	     var number = $.getUrlParam('number')
		 var preMenu = false
		 var afterMenu = false
		
		 getBlock(number)
		 $("#ContentPlaceHolder1_HyperLinkPrev").click(function(){
			
			 if(preMenu) {
				number -=1;
				getBlock(number)
			 }
		 })
		 $("#ContentPlaceHolder1_HyperLinkNext").click(function(){
			
			 if(afterMenu) {
				number = parseInt(number) + 1;
				getBlock(number)
			 }
		 })
     function getBlock(number){
            $.ajax({
                    type:"POST",
                    url:server_ip+"/get_block_by_number",
                    dataType:"json",
                    data:{
                           number: number,
                           },
                    error:function(request) { 
                        console.log(request);
                        alert("请求错误,请稍后重试");
                    },
                    success:function(data) {
                        console.log(data)
						if(data.data.preMenu) {
						  preMenu = data.data.preMenu
						} else {
						  preMenu = false
						}
						
						if(data.data.afterMenu) {
						  afterMenu = data.data.afterMenu
						} else {
						  afterMenu = false
						}
						$("#height1").empty()
						$("#height1").text(number)
						$("#height2").empty()
						$("#height2").text("#"+number)
						
						$("#extraData").empty()
						$("#extraData").text(data.data.result.extraData)
						
						$("#blockReward").empty()
						$("#blockReward").text(data.data.result.blockReward+" 能量币")
						
						$("#nonce").empty()
						$("#nonce").text(data.data.result.nonce)
						
						$("#unclesReward").empty()
						$("#unclesReward").text(data.data.result.unclesReward)
						
						$("#miner").empty()
						$("#miner").text(data.data.result.miner)
						 $("#miner").attr("href","address.htm?address="+data.data.result.miner);
						
						$("#diffculty").empty()
						$("#diffculty").text(data.data.result.diffculty)
						
						$("#timeStamp").empty()
						$("#timeStamp").text(data.data.result.timeStamp)
						
						$("#gasLimit").empty()
						$("#gasLimit").text(data.data.result.gasLimit)
						
						$("#gasUsed").empty()
						$("#gasUsed").text(data.data.result.gasUsed)
						
						$("#sha3Uncles").empty()
						$("#sha3Uncles").text(data.data.result.sha3Uncles)
						
						$("#size").empty()
						$("#size").text(data.data.result.size)
						
						//$("#transactionNum").empty()
						//$("#transactionNum").text(data.data.result.transactionNum)
						//$("#toTxs").attr("href","txs.htm?number="+number+"&age="+data.data.result.timeStamp);
						
						if(data.data.result.transactionNum == 0) {
						     $("#toTxstd").empty();
						    $("#toTxstd").append(
				        " <b id='transactionNum'>"+data.data.result.transactionNum+"</b> transactions in this block</td>")
						} else {
						 $("#toTxstd").empty();
						 $("#toTxstd").append("<a href='txs.htm?number="+number+"&age="+data.data.result.timeStamp+"'"+ 
                            "title='Click to View Transactions'>"+
				        " <b id='transactionNum'>"+data.data.result.transactionNum+"</b> transactions</a>  in this block</td>")
						}
						
						
						$("#totalDiffculty").empty()
						$("#totalDiffculty").text(data.data.result.totalDiffculty)
						
						$("#parentHash").empty()
						$("#parentHash").text(data.data.result.parentHash)
						
						$("#hash").empty()
						$("#hash").text(data.data.result.hash)
						
						
                    }
                })
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			    
       
        })(jQuery);