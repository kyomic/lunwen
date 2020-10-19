// 设置项目属性
fis.set('project.root', '');
fis.set('project.static','/static');

fis.set('project.files', ['*.html', 'map.json', '/test/*', 'mock/*']);

//引入模块化开发插件，设置规范为 commonJs 规范。
fis.hook('commonjs', {
    baseUrl: './web/static/',
    extList: ['.js']
});

/*************************全局配置*****************************/





fis.match('*.less', {
    rExt: '.css',
    parser: fis.plugin('less')
});

fis
// 开启同名依赖
.match('/admin/**', {
   //useSameNameRequire: true
})
// 开启同名依赖
.match('/web/**', {
    //useSameNameRequire: true
})
.match('/module/**', {
    //useSameNameRequire: true
})
.match('/page/**', {
    //useSameNameRequire: true
})
.match('*.less', {
    rExt: '.css',
    parser: fis.plugin('less')
})
//文件分配到此属性后，其 url 及其产出带 md5 戳
.match('*.{js,css,less,png,jpg,gif}', {
   //useHash: true
})    
//文件分配到此属性后，其 url 及其产出带 md5 戳
.match('*.{ttf,woff,woff2,svg}', {
   useHash: true
})
//资源域名
.match('*.{js,css,less}', {
})
    



    
/*************************打包*****************************/

fis.match("/web/static/js/**/**.{less,css}", {
    packTo: "/static/web/common/static/js/fxlib-common.css"
})
fis.match("fx/**.js", {
    packTo: "/static/web/common/static/js/fxlib.js"
})
fis.match("/(web|admin)/static/js/*.js", {
    packTo: "/static/$1/common/static/js/common_1.js"
})



/*************************文件压缩*****************************/
fis.media("pro")
    // 压缩html文件
    // .match("*.html",{
    //     optimizer : fis.plugin("htmlminify")
    // })
    // 压缩css
    .match('*.{less,css}', {
        optimizer: fis.plugin('clean-css')
    })    
    // 压缩png
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant'
        })
    })
    // 压缩js
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('::package', {
      packager: fis.plugin('map', {
        '/static/pkg/folderA.js': [
          '/view/static/js/fx/config.js',          
        ]
      })
    })
    .match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        postpackager: fis.plugin('loader', {
            //resourceType 默认 'auto', 可选 'mod'、'amd'、'system'、'commonJs'、'cmd'(sea.js)。
            resourceType: 'commonJs',
            useInlineMap: false, // 资源映射表内嵌
            allInOne: {
              js: function (file) {
                var path = file.url.replace(/\.html$/, '');
                var adminstr =  path.indexOf("/admin/")!=-1 ? "admin":"web";              
                path = path.replace(/modules\//,'');
                path = path.replace(/template\//,'');
                return "/static/"+adminstr + path + "_aio.js";
              },
              css: function (file) {
                var path = file.url.replace(/\.html$/, '')
                var adminstr =  path.indexOf("/admin/")!=-1 ? "admin":"web";              
                path = path.replace(/modules\//,'');
                path = path.replace(/template\//,'');
                return "/static/"+adminstr + path + "_aio.css";
              }
            }  
        })
    })
  
/*************************文件发布路径*****************************/


/*通用js/css*/
/*fis.match("/(web)/static/(**.{js,json,css,less,woff,woff2,font,ttf,eot,svg})", {
    release: '${project.static}/web/common/static/$2'
});*/
/*通用img/css*/
fis.match("/web/static/(**.{js,json,css,less,woff,woff2,font,ttf,eot,svg,png,jpg,jpeg,gif})", {
    release: "${project.static}/web/common/static/$1"
});
fis.match("/(admin)/static/(**.{js,json,css,less,woff,woff2,font,ttf,eot,svg,png,jpg,jpeg,gif})", {
    release: '${project.static}/admin/common/static/$2'
});


/* 页面级通用JS */
fis.match("/(admin)/view/common/(**.{js,json,css,less})", {
    release: '${project.static}/$1/view_common/$2'
});
fis.match("/(web)/view/common/(**.{js,json,css,less})", {
    release: '${project.static}/$1/view_common/$2'
});
fis.match("/(admin)/view/common/(**.{jpg,jpeg,png,gif})", {
    release: '${project.static}/$1/view_common/$2'
});
fis.match("/(admin)/view/page/(**.{jpg,jpeg,png,gif})", {
    release: '${project.static}/$1/view_page/$2'
});
fis.match("/(web)/view/common/(**.{jpg,jpeg,png,gif})", {
    release: '${project.static}/$1/view_common/$2'
});
fis.match("/(web)/view/page/(**.{jpg,jpeg,png,gif})", {
    release: '${project.static}/$1/view_page/$2'
});

/* 页面级通用HTML */
fis.match("/(admin)/view/common/(**.{html, tpl})", {
    release: '/common/template/$1/common/$2'
});
fis.match("/(web)/view/common/(**.{html, tpl})", {
    release: '/common/template/$1/common/$2'
});
//---------cmd module----------

/*
fis.match("/web/static/bootstrap/js/jquery.min.js", {
    isMod: true,
    packTo: "${project.static}/web/common/bootstrap/js/jquery.js"
});
*/
/*页面级的css,js */
fis.match("/(web)/view*/page/(**.{js,json,css,less})", {
    release: '${project.static}/$1/page/$2'
});
fis.match("/(admin)/view*/page/(**.{js,json,css,less})", {
    release: '${project.static}/$1/page/$2'
});
/* 业务页面 */
fis.match("/admin/view/page/(**)/(*.{html, tpl})", {
    release: '/modules/$1/template/$2'
});

fis.match("/web/view/page/(**)/(*.{html, tpl})", {
    release: '/modules/$1/template/$2'
});

fis.match("/web/view/page/(*)/(*)/(*.{html, tpl})", {
    release: '/modules/$1/template/$2/$3'
});




//---------cmd module----------f
fis.match("/web/static/js/fx/(**.js)", {
    isMod: true,
    packTo: '${project.static}/web/common/fx/common/$1'
});


