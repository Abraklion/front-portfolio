/*

 Минифицирует и переносит из папки src/assets/img/jpg,png,svg в папку dist/assets/img.
 Конвертирует картинки из папки src/assets/img/webp/jpg,png,gif в формат webp и переносит dist/assets/img.
 А так же просто переносит gif,ico,webp из папки src/assets/img/ в папку dist/assets/img.

 */

module.exports = function () {

  $.gulp.task('images', () => {

    // Конвертирует в формат webp
    $.gulp.src($.config.paths.images.webp + '**/*.{jpg,png,gif}')
      .pipe($.gp.webp({quality: 90}))
      .pipe($.gulp.dest($.config.output.pathImg));

    // Просто переносит gif,ico,webp
    $.gulp.src($.config.paths.images.img + '*.{gif,ico,webp}')
      .pipe($.gulp.dest($.config.output.pathImg));

    return $.gulp.src([$.config.paths.images.img + '*.{jpg,png,svg}', $.config.paths.images.webp + '*.{jpg,png}'])

      // Минифицирует и переносит
      .pipe($.gp.if($.config.toggle.resizeImg,$.gp.imagemin([
        $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
        $.gp.imagemin.optipng({optimizationLevel: 5}),
        $.gp.imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])))
      .pipe($.gulp.dest($.config.output.pathImg));
  });
}
