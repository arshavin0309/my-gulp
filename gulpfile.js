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
const fileInclude = require('gulp-file-include'); // подключение html к html
const typograf = require('gulp-typograf'); // расставляет неразрывные пробелы в нужных местах
const fs = require('fs'); // проверка на существование файла
const sourcemaps = require('gulp-sourcemaps'); // упрощает отладку, показывает в DevTools исходный путь
const svgmin = require('gulp-svgmin'); // сжатие и минификация svg картинок
const path = require('path');

function fonts() {
    const fontFolder = 'app/fonts';
    const destFolder = 'dist/fonts';

    if (!fs.existsSync(fontFolder)) {
        const { Readable } = require('stream');
        return new Readable({ read() { this.push(null); } });
    }

    const fontFiles = fs.readdirSync(fontFolder).filter(file => !file.startsWith('.'));

    if (fontFiles.length === 0) {
        const { Readable } = require('stream');
        return new Readable({ read() { this.push(null); } });
    }

    return src(`${fontFolder}/**/*`)
        .pipe(newer(destFolder))
        .pipe(dest(destFolder));
}

function svgIcons() {
    return src('app/images/src/**/*.svg')
        .pipe(svgmin({
            plugins: [
                {
                    name: 'removeViewBox',
                    active: false, // оставляем viewBox
                },
                {
                    name: 'cleanupIDs',
                    active: false, // не трогаем id, если они используются в CSS
                }
            ]
        }))
        .pipe(dest('app/images')); // или 'dist/icons'
}

function resources() {
    return src('app/upload/**/*')
        .pipe(dest('dist/upload'))
}

function pages() {
    return src('app/pages/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
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

        .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
        .pipe(newer('app/images/'))
        .pipe(webp())

        .pipe(src(['app/images/src/*.*', '!app/images/src/*.svg']))
        .pipe(newer('app/images/'))
        .pipe(imagemin())

        .pipe(dest('app/images/'))
        .pipe(browserSync.stream())
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
        .pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/',
            middleware: function (req, res, next) {
                // Расширения файлов, которые считаются ассетами (не HTML)
                const ignored = ['.css', '.js', '.map', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif'];

                // Если URL запроса содержит одно из расширений ассетов — пропускаем без проверки наличия файла
                if (ignored.some(ext => req.url.includes(ext))) {
                    return next(); // Не перехватываем запросы к стилям, скриптам и изображениям
                }

                // Определяем путь к файлу в файловой системе
                const filePath = path.join(__dirname, 'app', req.url === '/' ? 'index.html' : req.url);

                // Если запрашиваемый файл не существует — заменяем путь на кастомную страницу 404
                if (!fs.existsSync(filePath)) {
                    req.url = '/404.html';
                }

                // Продолжаем обработку запроса
                return next();
            }
        },
        // Отключаем синхронизацию действий (клики, скролл и т.п.) между вкладками/устройствами
        ghostMode: false
    });

    watch(['app/scss/**/*.scss'], styles);
    watch(['app/images/src/**/*.*'], images);
    watch(['app/js/**/*.js', '!app/js/main.min.js',], scripts);
    watch(['app/components/**/*.html', 'app/pages/**/*.html'], pages);
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/upload/**/*'], resources);
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
        'app/css/**/*.css',
        '!app/images/**/*.html',
        'app/images/*.*',
        'app/js/main.min.js',
        'app/*.html',
        'app/upload/**/*',
        'app/web.config',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.svgIcons = svgIcons;
exports.pages = pages;
exports.building = building;
exports.scripts = scripts;
exports.fonts = fonts;
exports.watching = watching;

exports.build = series(cleanDist, building, fonts);
exports.default = series(styles, images, svgIcons, scripts, pages, watching);