const $ = require("gogocode");

function refactor_import(code) {
  const ast = $(code);
  const imports = ast.find("import $$$ from '@antv/G6'");
  console.log("res", imports.match);

  imports.match.$$$$.forEach((i) => {
    if (i.type !== "ImportDefaultSpecifier") {
      ast.replace(`${i.imported.name}`, `G6.${i.imported.name}`);
    }
  });

  ast.replace("import $$$ from '@antv/G6'", "import G6 from '@antv/G6'");

  return ast.generate();
}

function refactor_group_find(code) {
  const ast = $(code);

  ast.replace(
    "$_$1.findByClassName($_$2)",
    "$_$1.find(element => element.get('className') === $_$2);"
  );

  return ast.generate();
}

function refactor_graph(code) {
  const ast = $(code);

  ast.replace("$_$1.changeLayout($_$2)", "$_$1.updateLayout($_$2)");
  ast.replace("$_$.refreshLayout()", "$_$.layout()");

  return ast.generate();
}

function refactor_animate(code) {
  const ast = $(code);

  ast.replace(
    `$_$1.registerEdge($_$2,{
    afterDraw: ($$$2) => {
      $$$5
      $_$4.animate(
            {
              onFrame($_$5){
                $$$4
              },
              $$$3
            },
            $_$6
          )
    },
    $$$1
  },$_$3)`,
    `
  $_$1.registerEdge($_$2,{
    afterDraw($$$2){
      $$$5
      $_$4.animate(
        ($_$5) => {
          $$$4
        },
        {
          $$$3,
          duration: $_$6
        }
      )
    },
    $$$1
  },$_$3)`
  );

  ast.replace(
    `$_$1.registerEdge($_$2,{
    afterDraw($$$2) {
      $$$5
      $_$4.animate(
            {
              onFrame($_$5){
                $$$4
              },
              $$$3
            },
            $_$6
          )
    },
    $$$1
  },$_$3)`,
    `
  $_$1.registerEdge($_$2,{
    afterDraw($$$2){
      $$$5
      $_$4.animate(
        ($_$5) => {
          $$$4
        },
        {
          $$$3,
          duration: $_$6
        }
      )
    },
    $$$1
  },$_$3)`
  );

  return ast.generate();
}

function refator_element_type(code) {
  const ast = $(code);

  ast.replace(
    "{id: $_$1, shape: $_$2,  $$$1}",
    "{id: $_$1, type: $_$2,  $$$1}"
  );

  return ast.generate();
}

function refactor_marker_radius(code) {
  const ast = $(code);
  ast.replace(
    `$_$1.addShape('marker', {
      attrs: {
        radius: $_$2,
        $$$1
      },
      $$$2
    })`,
    `$_$1.addShape('marker', {
      attrs: {
        r: $_$2,
        $$$1
      },
      $$$2
    })`
  );
  return ast.generate();
}

module.exports = {
  refactor_import,
  refactor_group_find,
  refactor_graph,
  refactor_animate,
  refator_element_type,
  refactor_marker_radius,
};
