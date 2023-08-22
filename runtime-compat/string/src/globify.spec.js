import globify from "./globify.js";

const paths = [
  "a",
  "a.js",
  "a.css",
  "a_js",
  "a/b.js",
  "a/b.css",
  "a/b_css",
  "a/b/c.js",
  "a/b/c.css",
  "a/b/c_css",
  "b",
];

export default test => {
  test.reassert(assert => {
    const check = (glob, positions) => {
      const globbed = globify(glob);

      paths.map((path, i) =>
        assert(globbed.test(path)).equals(positions.includes(i))
      );
    };
    return check;
  });
  test.case("simple", check => {
    check("a", [0]);
    check("a.js", [1]);
    check("a.css", [2]);
  });
  test.case("simply wildcard", check => {
    check("*", [0,1,2,3,10]);
    check("a*", [0,1,2,3]);
    check("a.*", [1,2]);
  });
  test.case("double wildcard", check => {
    check("**", paths.map((_, i) => i));
    check("a**", paths.flatMap((path, i) => path.startsWith("a") ? [i] : []));
    check("**.", []);
    check("**.js", [1, 4, 7]);
    check("**.css", [2, 5, 8]);
    check("**.*", [1, 2, 4, 5, 7, 8]);
    check("**_*", [3, 6, 9]);
    check("**/*", paths.flatMap((path, i) => path.includes("/") ? [i] : []));
  });
};
