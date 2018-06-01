 
 (function ($) {

     $("#myheader").load("./common/header2.htm")
	   var page = 1;
       var address = $.getUrlParam('address')
	 
	   getBlockList(address,page)
	   $(".pageFrist").click(function(){
		 page = 1;
		 getBlockList(address,page)
		})
		
		$(".pageNext").click(function(){
		
		 if(page+1 <= $("#pageCount").text()) {
		  page += 1;
		 getBlockList(address,page)
		 }
		})
		
		$(".pageLast").click(function(){
		 page = $("#pageCount").text()
		 getBlockList(address,page)
		})
		
		$(".pagePrev").click(function(){
		
		 if(page-1 >= 1) {
		  page -= 1;
		  getBlockList(address,page)
		 }
		})
	   
	   
         function getBlockList(address,pagenow){
        	var data=''
			if(address ==null) {
				data = {page:pagenow,pagesize:15}
			 }else {
			    data = {address:address,page:pagenow,pagesize:15}
			 }
            $.ajax({
                    type:"POST",
                    url:server_ip+"/txlist_accounts",
                    dataType:"json",
                    data:data,
                    error:function(request) { 
                        console.log(request);
                        alert("请求错误,请稍后重试");
                    },
					
                    success:function(data) {
                        console.log(data)
						 $("#address").empty()
						 $("#address").text(address)
						 $("#tableList").empty()
						 $(".pageCount").empty();
						 $(".pageCount").text(data.data.page.totalPage)
						 $(".currentPage").empty();
						$(".currentPage").text(pagenow)
						$.each(data.data.result, function(i,value){
						  typeString = ""
                           if(value.type == 2) {
						    typeString ="<i class='fa fa-file-text-o' rel='tooltip' data-placement='bottom' title='Contract'></i>"
						   } 
						   value.tourl = value.to
						   if(value.type == 3) {
						       value.to = 'Contract Creation'
						   }
						   
						   type = ""
						   if("receiver" == value.status) {
								 type = "<span class='label label-orange rounded'>OUT</span>"
							} else{
								type = " <span class='label label-success rounded'>IN</span>"
							}
						   $("#tableList").append("<tr>"+
						    "<td>"+
                            "<span class='address-tag'>"+
                            " <a href='txsDetail.htm?hash="+value.txHash+"'>"+value.txHash+"</a>"+
                            "</span>"+
                            "</td>"+
						   
							 "<td class='hidden-sm'>"+
						   "<a href='block_overview.htm?number="+value.block+"' >"+value.block+"</a>"+
							"</td>"+
							"<td>"+
							"  <span rel='tooltip' data-placement='bottom' title='"+value.age+"'>"+value.age+"</span>"+
							"</td>"+
							"<td>"+
							"  <span class='address-tag'>"+
								"<a href='address.htm?address="+value.from+"'>"+value.from+"</a>"+
							 " </span>"+
							"</td>"+
							"<td>"+
							type+
							"</td>"+
							"<td>"+
							 typeString+
							 
							 "<span class='address-tag'>"+
							"	<a href='address.htm?address="+value.tourl+"'"+
							"	>"+value.to+"</a>"+
							 " </span>"+
							"</td>"+
							"<td>"+value.value+" Ether</td>"+
							"<td>"+
							value.txFee+
							"</td>"+ 
						   
						   "</tr>")  
						    
						 })
                    }
                })
			}
        })(jQuery);