export function MatchCycleColors(_clist) {
  // store unique color and weight in dictionary
  let temp_colors = {};
  // result for 3 cycles
  let result_dict = {
    cycle1: [],
    cycle2: [],
    cycle3: [],
  };
  // final result in list string
  let result_list = [];

  // count colors
  for (let c in _clist) {
    if (!(_clist[c] in temp_colors)) {
      temp_colors[_clist[c]] = 1;
    } else {
      temp_colors[_clist[c]] += 1;
    }
  }

  // seperate to cycles
  for (let tc in temp_colors) {
    for (let c in result_dict) {
      if (
        result_dict[c].length ==
        Math.min(
          result_dict["cycle1"].length,
          result_dict["cycle2"].length,
          result_dict["cycle3"].length
        )
      ) {
        result_dict[c].push(tc, temp_colors[tc]);
        break;
      }
    }
  }
  if (
    result_dict["cycle1"].length === 2 &&
    result_dict["cycle2"].length === 0 &&
    result_dict["cycle3"].length === 0
  ) {
    result_dict["cycle2"] = result_dict["cycle1"];
    result_dict["cycle3"] = result_dict["cycle1"];
  }
  // encode to string
  for (let c in result_dict) {
    // result each cycle
    let result = "";
    // for find all weight
    let all = 0;
    let w_index = 1;
    // for convert to string
    let before_deg = 0;
    let c_index = 1;

    // find all weight
    while (w_index < result_dict[c].length) {
      all += result_dict[c][w_index];
      w_index += 2;
    }

    // convert to string
    while (c_index < result_dict[c].length) {
      let color_range = Math.floor((result_dict[c][c_index] / all) * 360);
      if (result_dict[c].length == 2) {
        result +=
          result_dict[c][c_index - 1] +
          " " +
          "0deg, " +
          result_dict[c][c_index - 1] +
          " " +
          color_range +
          "deg";
        break;
      }
      if (c_index == 1) {
        result +=
          result_dict[c][c_index - 1] +
          " " +
          before_deg +
          "deg, " +
          result_dict[c][c_index - 1] +
          " " +
          (before_deg + color_range) +
          "deg, ";
      } else if (
        c_index == result_dict[c].length - 1 ||
        c_index == result_dict[c].length - 2
      ) {
        result += result_dict[c][c_index - 1] + " " + before_deg + "deg";
      } else {
        result +=
          result_dict[c][c_index - 1] +
          " " +
          before_deg +
          "deg, " +
          result_dict[c][c_index - 1] +
          " " +
          (before_deg + color_range) +
          "deg, ";
      }
      before_deg = color_range;
      c_index += 2;
    }
    // 0 1 2 3 4 5 6
    result_list.push(result);
  }

  // console.log(result_list);
  return result_list;
}
