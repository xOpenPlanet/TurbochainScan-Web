(function ($) {
     $("#myheader").load("./common/header2.htm")
		var page = 1
		var pagesize = 25
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
                    url:server_ip+"/accounts",
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
                        console.log(data)
						$("#tableData").empty() 
						$(".pageCount").empty();
						$(".pageCount").text(data.data.page.totalPage)
						$(".currentPage").empty();
						$(".currentPage").text(page)
						var type = ""
                       $.each(data.data.result, function(i,value){      
                            
							type = ""
						    if(value.type != 1) {
							 type =" <i title='Contract' class='fa fa-file-text-o'></i>"
							}
							$("#tableData").append("<tr>"+
							"<td>"+(i+1)+"</td>"+  
                            " <td>"+
					         type+
                             "<a href='address.htm?address="+value.address+"'>"+value.address+"</a>"+
                            " </td>"+
                            " <td> "+value.balance+" 能量币</td>"+
                    
                            "<td>"+value.txCount+"</td></tr>"
							)
							
                       });   
                    }
                })
			}
		})(jQuery);