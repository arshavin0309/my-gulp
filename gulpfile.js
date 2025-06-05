const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass')); //преобразование scss/sass в css
const concat = require('gulp-concat'); // объединение файлов
const uglify = require('gulp-uglify-es').default; //используется для минификации js
const browserSync = require('browser-sync').create(); // запускает локальный сервер
const autoprefixer = require('gulp-autoprefixer'); // приводит css к кросбраузерности
const clean = require('gulp-clean'); // удаление папок
const avif = require('gulp-avif'); // конвертер в avif
const webp = require('gulp-webp'); // конвертер в webp
const imagemin = require('gulp-imagemin'); // сжимание картинок
const newer = require('gulp-newer'); // кэш
const svgSprite = require('gulp-svg-sprite'); // объединение svg картинок в 1 файл
const include = require('gulp-include'); // подключение html к html
const typograf = require('gulp-typograf'); // расставляет неразрывные пробелы в нужных местах
const fs = require('fs'); // проверка на существование файла
const sourcemaps = require('gulp-sourcemaps'); // упрощает отладку, показывает в DevTools исходный путь

function resources() {
    return src('app/upload/**/*')
        .pipe(dest('dist/upload'))
}

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(typograf({
            locale: ['ru', 'en-US'],
            safeTags: [
                ['<no-typography>', '</no-typography>']
            ]
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
        .pipe(newer('app/images/'))
        .pipe(avif({ quality: 90 }))
        .pipe(dest('app/images/'))
        .pipe(webp())
        .pipe(dest('app/images/'))
        .pipe(imagemin())
        .pipe(dest('app/images/'))

        .pipe(browserSync.stream())
}

function sprite() {
    return src('app/images/src/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui/dist/jquery-ui.js',
        'node_modules/swiper/swiper-bundle.js',
        'app/js/**/*.js',
        '!app/js/main.min.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify({
            compress: true,
            mangle: false
        }))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    const path = require('path');

    browserSync.init({
        server: {
            baseDir: 'app/',
            middleware: function (req, res, next) {
                const filePath = path.join(__dirname, 'app', req.url === '/' ? 'index.html' : req.url);

                if (!fs.existsSync(filePath)) {
                    const notFoundPath = path.join(__dirname, 'app', '404.html');
                    if (fs.existsSync(notFoundPath)) {
                        let html = fs.readFileSync(notFoundPath, 'utf8');
                        
                        // Вставим кастомный <title> для 404
                        html = html.replace(/<title>(.*?)<\/title>/i, '<title>Страница не найдена - 404</title>');

                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(html);
                        return;
                    }
                }

                return next();
            }
        },
        ghostMode: false
    });
    
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/images/src/**/*.*'], images)
    watch(['app/js/**/*.js', '!app/js/main.min.js',], scripts)
    watch(['app/components/**/*.html', 'app/pages/**/*.html'], pages)
    watch(['app/*.html']).on('change', browserSync.reload)
    watch(['app/upload/**/*'], resources)
}

function cleanDist() {
    // Проверяем, существует ли папка dist
    if (fs.existsSync('dist')) {
        return src('dist', { allowEmpty: true })
            .pipe(clean());
    } else {
        // Возвращаем "пустой" поток, чтобы Gulp не упал
        const { Readable } = require('stream');
        return new Readable({ read() { this.push(null); } });
    }
}

function building() {
    return src([
        // 'app/css/style.min.css',
        'app/css/**/*.css',
        '!app/images/**/*.html',
        'app/images/*.*',
        // '!app/images/*.svg',
        // 'app/images/sprite.svg',
        'app/js/main.min.js',
        'app/*.html',
        'app/upload/**/*',
        'app/web.config',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.pages = pages;
exports.building = building;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = series(styles, images, scripts, pages, watching);