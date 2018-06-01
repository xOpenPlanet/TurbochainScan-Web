(function ($) {

     $("#myheader").load("./common/header2.htm")
        var page = 1
		var pagesize = 15
		getPage(page,pagesize)
		
		$(".pageFrist").click(function(){
		 page = 1;
		 getPage(page,pagesize)
		})
		
		$(".pageNext").click(function(){
		
		 if(page+1 <= $("#pageCount").text()) {
		  page += 1;
		  getPage(page,pagesize)
		 }
		})
		
		$(".pageLast").click(function(){
		 page = $("#pageCount").text()
		 getPage(page,pagesize)
		})
		
		$(".pagePrev").click(function(){
		
		 if(page-1 >= 1) {
		  page -= 1;
		  getPage(page,pagesize)
		 }
		})
		function getPage(page,pagesize){
            $.ajax({
                    type:"POST",//提交请求的方式
                    url:server_ip+"/blocks",
                    dataType:"json",
                    data:{
                        page: page,
                        pagesize: pagesize
                           },//把内容序列化
                    error:function(request) { //请求出错
                        console.log(request);
                        alert("请求错误,请稍后重试");
                    },
                    success:function(data) {
						
                        console.log("00"+data)
						
						$("#table").empty() 
						$(".pageCount").empty();
						$(".pageCount").text(data.data.countPage)
						$(".currentPage").empty();
						$(".currentPage").text(page)
						$("#showMeaasge").empty()
                        $("#showMeaasge").text("显示(#"+data.data.startIndex+" - #"+data.data.endIndex+") 共 "+
						data.data.blockHeight+"个区块")
                         
                       $.each(data.data.result, function(i,value){      
                           
							$("#table").append(" <tr> "+
							   "<td><a href='block_overview.htm?number="+value.height+"'>"+value.height+"</a></td>"+
							   "<td><span rel='tooltip' data-placement='bottom' > "+
							   value.age+"</span></td>"+
							   "<td><a href='txs.htm?number="+value.height+"&age="+value.age+"'>"+value.txn+"</a></td>"+
							   "<td>"+value.uncles+"</td>"+
							   "<td><a href='address.htm?address="+value.miner+"'  class='address-tag' title='"+value.miner+"'>"+value.miner+"</a></td>"+
							   "<td>"+value.gasUsed+"</td>"+
							   "<td>"+value.gasLimit+"</td>"+
							   "<td>"+value.avgGasPrice+" Gwei</td>"+
							   "<td>"+value.reward+" 能量币</td>"+
							  "</tr>")
							
                       });   
                    }
                })
			}

	})(jQuery);	