 
 (function ($) {

     $("#myheader").load("./common/header2.htm")
	   var address = $.getUrlParam('address')
	   
	   if(address !=null ){
	       $("#address").empty()
		   $("#address").text(address)
	       getAddress(address)
	   }
         function getAddress(hash){
            $.ajax({
                    type:"POST",
                    url:server_ip+"/txlist_accounts",
                    dataType:"json",
                    data:{
                           address: hash,
						 
                           },
                    error:function(request) { 
                        console.log(request);
                        alert("请求错误,请稍后重试");
                    },
					
                    success:function(data) {
                        console.log(data)
						$("#table").empty();
						$("#total1").empty();
						$("#total1").text(data.data.page.allRow+" txns")
						$("#total2").empty();
						$("#total2").text(data.data.page.allRow+" transactions ")
						
						$("#balance").empty();
						$("#balance").text(data.data.balance+' 能量币');
						$(".toTxs").attr('href',"txsAccountes.htm?address="+hash)
						var type= ""
						$.each(data.data.result, function(i,value){ 
							if("receiver" == value.status) {
								 type = "<span class='label label-orange rounded'>OUT</span>"
							} else{
								type = " <span class='label label-success rounded'>IN</span>"
							}
							
						   value.tourl = value.to
						   typeString = ""
                           if(value.type == 2) {
						    typeString ="<i class='fa fa-file-text-o' rel='tooltip' "+
							"data-placement='bottom' title='Contract'></i>"
						   } else if(value.type == 3){
						     typeString = 
							 "<img src='./images/application-table.png' title='New Contract Created'"+
							 "style='margin-top:-4px; margin-bottom:-3px' />"

                             value.to = "Contract Creation"						  
						  }
						
						    $("#table").append("<tr>"+
							"<td>"+
							" <a class='address-tag'href='txsDetail.htm?hash="+value.txHash+"'>"+
							value.txHash+"</a>"+
							"</td>"+
							"<td class='hidden-sm'>"+
							" <a href='block_overview.htm?number="+value.block+"'>"+value.block+"</a>"+
							"</td>"+
							"<td>"+
							"<span rel='tooltip' data-placement='bottom' title='"+value.age+"'>"+
							value.age+"</span>"+
							"</td>"+
							"<td>"+
							" <a class='address-tag'"+
							" href='address.htm?address="+value.from+"'>"+value.from+"</a>"+
							"</td>"+
							"<td>"+
							type+
							"</td>"+
							"<td>"+typeString+
							" <a class='address-tag'"+
							" href='address.htm?address="+value.tourl+"'>"+value.to+"</a>"+
							"</td>"+
							"<td>"+value.value+" 能量币</td>"+
							"<td>"+
							" <font color='gray' size='1'>"+value.txFee+"</font>"+
							"</td>"+
						    "</tr>"
							  )
						 })
                    }
                })
			}
        })(jQuery);