var o = _curry3(function _o(f2, f1, x) { return f2(f1(x)) });
var x = _curry3(function _x(f1, f2, x) { return f2(f1(x)) });

function pipe (firstPipeArgument, _) {
  var pipeArguments          = arguments,
      pipeArgumentsLastIndex = arguments.length - 1;

  return _arity(firstPipeArgument.length, function _piped () {
    var pipeArgumentIndex = 0,
        pipeResult        = firstPipeArgument.apply(null, arguments);

    while (pipeArgumentIndex < pipeArgumentsLastIndex) pipeResult = pipeArguments[++pipeArgumentIndex](pipeResult);
    return pipeResult;
  });
};

function compose (_exec1, _exec2) {
  var executors = _init(arguments), exec = arguments[arguments.length - 1], length = executors.length;
  return _arity(exec.length, function _composed () {
    var initial = exec.apply(null, arguments);
    while (--length > -1) initial = executors[length](initial);
    return initial;
  });
}
function everything (_exec1, _exec2) {
  var executors = arguments, length = executors.length;
  return _arity(_exec1.length, function _every() {
    var index = 0;
    while (index < length) {
      if (executors[index].apply(null, arguments)) { index++; continue; }
      return false;
    } return true;
  });
}
function something (_exec1, _exec2) {
  var executors = arguments, length = executors.length;
  return _arity(_exec1.length, function _some() {
    var index = 0;
    while (index < length) {
      if (executors[index].apply(null, arguments)) return true; index++;
    } return false;
  });
}
function nothing(_exec1, _exec2) {
  var executors = arguments, length = executors.length;
  return _arity(_exec1.length, function _none() {
    var index = 0;
    while (index < length) {
      if (executors[index].apply(null, arguments)) return false; index++;
    } return true;
  });
}
function _init (list) {
  var index = 0, stop = list.length - 1, tailed = Array(stop);
  while (index < stop) tailed[index] = list[index++];
  return tailed;
}
function _fillPlaceholder (parameters, newParameters) {
  var index = 0, length = parameters.length;
  while (index < length && newParameters.length) {
    if (isPlaceholder(parameters[index])) parameters[index] = newParameters.shift();
    index++;
  }
  return _concat(parameters, newParameters);
}
function _countPlaceholders(list, length) {
  var index = 0, counted = 0;
  while (index < length) { if (isPlaceholder(list[index])) counted++; index++; }
  return counted;
}
function dinamic (exec) {

  var parameters = arguments[1] || [], count = arguments[2] || _countPlaceholders(parameters, parameters.length);
  console.log({ parameters });
  return _arity(count || 1, function dinamicUse () {
    var argLength = arguments.length;
    if (argLength > 0) {
      console.log({ argLength, count });
      if (count) {
        var parametersLength = parameters.length;
        parameters = _fillPlaceholder(parameters, Array.from(arguments));
        count = _countPlaceholders(parameters, parametersLength + argLength);
        console.log({ parameters, count });
      }
      else {
        parameters = _concat(parameters, arguments);
        count = _countPlaceholders(arguments, argLength);
        console.log("else", { parameters, count });
      }
    }
    console.log({ count, p: parameters})
    if (count > 0) return dinamic(exec, parameters, count);
    return exec.apply(null, parameters);
  });
};
