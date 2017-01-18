console.log('Angular Masks mounted')

angular
  .module('ng-masks', [])
  .directive('ngMask', function () {
    return {
      require: 'ngModel',
      scope: {
      },
      link: function(scope, element, attrs, ctrl) {
        function _getCharType(char) {
          if(char.match(/\d/)) {
            return 'number'
          } else if(char.match(/[aA-zZ]/)) {
            return 'letter'
          } else {
            return 'specialChar'
          }
        };

        function _format(input) {
          if(!input) return

          var charAt = charArray[input.length - 1]
          var type = _getCharType(input.substring(input.length - 1))
          if(input.length > charArray.length) {
            return input.substring(0, charArray.length)
          } else {
            if(charArray[input.length - 1]['type'] == type) {
              return input
            } else if(charArray[input.length - 1]['type'] == 'specialChar') {
              input = input.substring(0, charArray[input.length - 1]['position']) +
                        charArray[input.length - 1]['char'] +
                        input.substring(charArray[input.length - 1]['position'], input.length)
              return input
            } else {
              var lastChar = input.length - 1

              return input.substring(0, lastChar)
            }
          }
        };

        function _cleanOnBackspace() {
          if(e.keyCode == 8) {
            ctrl.$setViewValue(_format(''));
            ctrl.$render();
          };
        }

        if(attrs.ngMaskPattern) {
          var pattern = attrs.ngMaskPattern
          charArray = []

          angular.forEach(pattern, function(char, index) {
            var type = _getCharType(char)
            var charObject = {char: char, position: index, type: type}
            this.push(charObject)
          }, charArray);
        } else {
          console.warn('ng-mask-pattern param was forgotten')
        }

        element.bind("keyup", function() {
          ctrl.$setViewValue(_format(ctrl.$viewValue));
          ctrl.$render();
        });

        element.bind("keydown", function(e) {
          if(e.keyCode == 8 && attrs.ngMaskClean != 'false') {
            ctrl.$setViewValue(_format(''));
            ctrl.$render();
          } else {
            ctrl.$setViewValue(_format(ctrl.$viewValue));
            ctrl.$render();
          };
        });
      }
    }
  })
