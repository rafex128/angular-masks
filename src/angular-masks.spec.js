describe('ngMask Directive', function() {
  var $compile, $rootScope;

  beforeEach(module('ngMasks'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('has a dummy spec to test 2 + 2', function() {
    expect(1).toEqual(1)
  });
});
