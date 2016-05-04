/**
 * Created by 静龄 on 2015/11/10.
 */


!
    function(window){
        Rpage={"version":"1.0",authon:"darkness"};
        window.Rpage=Rpage;
    }(window),


    function(Rpage){
        Rpage.pageObj=function(pagediv){
            this.setpagediv=function(pagediv){
                this.jqpagediv=pagediv;
                this.jqpagediv.html('' +
                    '<div class="prepage"><span></span>上一页</div>' +
                    '<div class="resultPage">' +
                    '<ul class="R_pagenum"></ul> ' +
                    '</div>' +
                    '<div class="nextpage">下一页<span></span></div>' +
                    '<div class="resultStatus"> ' +
                    '</div>');

                var pageobjthis=this;
                this.jqpagediv.children(".resultPage").children(".R_pagenum").on("click","li",function(){
                    pageobjthis.pagenum=$(this).html();
                    pageobjthis.defaultpagechange();
                    pageobjthis.pagechange();
                });

                this.jqpagediv.children(".prepage").click(function(e){
                    pageobjthis.pagenum--;
                    pageobjthis.defaultpagechange();
                    pageobjthis.pagechange();
                });

                this.jqpagediv.children(".nextpage").click(function(e){
                    pageobjthis.pagenum++;
                    pageobjthis.defaultpagechange();
                    pageobjthis.pagechange();
                });
                return pagediv;

            };
            this.jqpagediv=(pagediv?this.setpagediv(pagediv):null);
            this.perpage=10;
            this.pagenum=1;
            this.alldatacount=0;
            this.isshow=true;
            this.pagechange=function(){};
            this.defaultpagechange=function(){
                $(".R_pagenum").html("");
            };
            this.addclass=function(cssname){
                this.jqpagediv.addClass(cssname);
            };
            this.setpagechange=function(func){
                this.pagechange=func;
            };
            this.setisshowpagediv=function(isshow){
                this.isshow=isshow;
            };
            this.setalldatacount=function(num){
                if(this.isshow){
                    this.jqpagediv.show();
                }else{
                    this.jqpagediv.hide();
                }
                this.alldatacount=num;
                $(".R_pagenum").html("");
                var pages=num/this.perpage;
                if(this.alldatacount%10==0){
                    pages=pages-(0.1);
                }
                if(pages<=1){
                    this.jqpagediv.hide();
                }else{
                    for(var i=0;i<(pages);i++){
                        if(i==0 || i==parseInt(pages) || (i>this.pagenum-6)&&i<(this.pagenum-(-4))){
                            $(".R_pagenum").append("<li>"+(i-(-1))+"</li>");
                            if((i-(-1))==this.pagenum){
                                $(".R_pagenum").children("li:last-child").css("font-weight","bolder");
                            }
                        }else{
                            if(i==2||i==(parseInt(pages)-1)){
                                $(".R_pagenum").append("<span style='float: left'>...</span>");
                            }
                        }
                    }
                    if(this.pagenum=="1"){
                        $(".prepage").hide();
                    }else{
                        $(".prepage").show();
                    }
                    if(this.pagenum>=pages){
                        $(".nextpage").hide();
                    }else{
                        $(".nextpage").show();
                    }
                }
            };
        };
    }(Rpage)

