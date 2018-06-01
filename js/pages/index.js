(function ($) {

    $("#myheader").load("./common/header1.htm")
	   var page = 1;
	   var pagesize = 15;
       getLastData()
       getImgData()
	   getBlockList(page,pagesize,type=1)
	   getTxsList(page,pagesize,type=1)
	
	   function timer(){
           getLastData()
           getImgData()
		   getBlockList(page,pagesize,type=2)
	       getTxsList(page,pagesize,type=2)
	   }
	    setInterval(timer,100000)
         function getBlockList(pagenow,pagesize,type){
            $.ajax({
                    type:"POST",
                    url:server_ip+"/blocks",
                    dataType:"json",
					async:false,
                    data:{
						    page:pagenow,
							pagesize:pagesize
						 },
                    error:function(request) { 
                        console.log(request);
                       // alert("请求错误,请稍后重试");
                    },
					
                    success:function(data) {
                        console.log(data)
                        toid=''
						if(type == 1) {
                            toid='#scrollbar2'
                        }else {
                            toid ="#mCSB_1_container"
                        }
						$(toid).empty();
						$.each(data.data.result, function(i,value){
						
						$(toid).append(
							
						" <div class='profile-event'> "+
                        "<div class='date-formats' style='width: 135px; height: 65px; margin-top:2px'>"+
                        " <span>"+
                        " <a href='block_overview.htm?number="+value.height+"' >"+
                        "   <font size='2' color='white'>区块"+value.height+"</font>"+
                        " </a>"+
                        " </span>"+
                        " <small> > "+value.age+"</small>"+
                        " </div>"+
                        " <div class='overflow-h'>挖矿机 "+
                        " <a href='address.htm?address="+value.miner+"' class='address-tag'>"+value.miner+"</a>"+
                        " <p>"+
                        " <a href='txs.htm?number="+value.height+"&age="+value.age+"'  title='Transactions in this Block'>"+
                        "  <b>"+value.txn+" txns</b></a>"+
                        "  in 5 secs</p>"+
                        " <p>区块奖励"+
                         value.reward+"能量币</p></div>"+
                       " </div>"
							
							)
						    
						 })
						 
                    }
                })
			}
			
			
			function getTxsList(pagenow,pagesize,type){
            $.ajax({
                    type:"POST",
                    url:server_ip+"/txlist_block_number",
                    dataType:"json",
					async:false,
                    data:{
						    page:pagenow,
							pagesize:pagesize
						 },
                    error:function(request) { 
                        console.log(request);
                        //alert("请求错误,请稍后重试");
                    },
					
                    success:function(data) {
                        console.log(data)
						 toid = ''
                        if(type==1) {
                            toid="#scrollbar"
                        }else {
                            toid="#mCSB_2_container"
                        }

						 $(toid).empty()
						
						
						$.each(data.data.result, function(i,value){
						    
							colorType = "<div class='profile-post color-three'> "
							if(i % 2 == 0 ) {
								colorType = "<div class='profile-post color-one'> "
							} 
							if(i % 3 == 0 ) {
								colorType = "<div class='profile-post color-four'> "
							}
							$(toid).append(
							
						colorType+
					    " <span class='profile-post-numb'><i class='fa fa-hdd-o'></i></span>"+
                        "<div class='profile-post-in'>"+
						
                        " <h3 class='heading-xs'>TX# "+
                        " <a href='txsDetail.htm?hash="+ value.txHash+"' class='hash-tag-frontpage' "+
						"title='Transaction Hash'>"+
                        "   <font "+
						"color='#3498DB'>"+
						  value.txHash+"</font>"+
                        " </a>"+
                        "<span class='pull-right' style='font-size: small'>> "+value.age+"</span></h3>"+
                        "<p>发送 "+
                        "<a href='address.htm?address="+value.from+"' class='address-tag'>"+value.from+
						"</"+
						"a> 接收 "+
                        " <a href='address.htm?address="+value.to+"' "+
						" class='address-tag'>"+value.to+"</a></p>"+
                        " <p>数目 "+value.value+" 能量币</p>"+
                        "</div>"+
                        "</div>"
							
							)
						    
						 })
						 
                    }
                })
			}



    function getImgData(){
        $.ajax({
            type:"POST",
            url:server_ip+"/tx_chart_info",
            dataType:"json",
            async:false,

            error:function(request) {
                console.log(request);
                //alert("请求错误,请稍后重试");
            },

            success:function(data) {


                $(function () {

                    $('#containerchart').highcharts({
                        chart: {
                            backgroundColor: '#0a3356',
                            borderColor: '#0a3356',
                           // borderWidth: 3,
                            //color:'#fff',
                            type: 'line',
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingLeft: 0,
                            spacingRight: 0,
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: '14天TurboChain交易历史',
                            style: {
                                fontSize: '13px',
                                color:'#fff'
                            },
                            y:13
                        },
                        xAxis: {
                            title: { text: '' },
                            categories: data.data.categories

                        },
                        yAxis: {
                            labels: {
                                enabled: true
                            },
                            title: {
                                text: null
                            }

                        },

                        tooltip: {
                            formatter: function () {
                                return '<span style="font-size:10px">' + this.point.friendlydate +     '</span><br><table><tr><td style="padding:0">' +
                                    '<span >Transactions: </a></span><b>' + this.point.y + '</b><br>'
                                '</td></tr></table>';
                            }
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 0
                                },
                                point: {
                                    events: {
                                        select: function (e) {
                                            //location.href = 
                                        }
                                    }
                                }
                            },
                            column: {
                                pointPadding: 0.1,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: 'Transactions',
                            data: data.data.data,
                            allowPointSelect: true,
                            color:'#deb46c'
                        },
                        ]
                    });
                });


            }
        })
    }

    function getLastData(){
        $.ajax({
            type:"POST",
            url:server_ip+"/summary",
            //url:"http://192.168.2.135:8888/summary",
            dataType:"json",
            async:false,

            error:function(request) {
                console.log(request);
                //alert("请求错误,请稍后重试");
            },

            success:function(data) {
                console.log(data)

                $("#txn_count").empty()
                $("#txn_count").text(data.data.txn_count)

                $("#block_height").empty()
                $("#block_height").text(data.data.block_height)

                $("#hashrate").empty()
                $("#hashrate").text(data.data.hashrate)

                $("#difficult").empty()
                $("#difficult").text(data.data.difficulty)


            }
        })
    }

})(jQuery);