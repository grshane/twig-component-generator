'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the brilliant ${chalk.red('generator-wvu-twig-component')} generator!`
      )
    );

    const prompts = [
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of component are you generating?',
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
        required: true
      },
      {
        type: 'string',
        name: 'name',
        message: 'What should your component be called?',
        required: true
      },
      {
        type: 'list',
        name: 'js',
        message: 'Do you want some javascript with that?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'plType',
        message: 'Is this a Drupal project or Standalone PatternLab',
        choices: ['Drupal', 'Standalone'],
        store: true,
        default: this.config.get('plType')
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var componentName = {
      snaked: _.snakeCase(this.props.name),
      dashed: _.kebabCase(this.props.name),
      camel: _.camelCase(this.props.name)
    };
    var componentBase;
    switch (this.props.componentType) {
      case 'Atom':
        componentBase = '01-atoms';
        break;
      case 'Molecule':
        componentBase = '02-molecules';
        break;
      case 'Organism':
        componentBase = '03-organisms';
        break;
      case 'Template':
        componentBase = '04-templates';
        break;
      case 'Page':
        componentBase = '05-pages';
        break;
      default:
    }

    if (this.props.js === 'Yes') {
      if (this.props.plType === 'Standalone') {
        this.fs.copyTpl(
          this.templatePath('name-pl.js'),
          this.destinationPath(
            'components/_patterns/' +
              componentBase +
              '/' +
              componentName.dashed +
              '/' +
              componentName.dashed +
              '.js'
          ),
          {
            name: componentName.raw,
            nameDashed: componentName.dashed,
            nameCamel: componentName.camel,
            nameSnake: componentName.snaked
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('name.js'),
          this.destinationPath(
            'components/_patterns/' +
              componentBase +
              '/' +
              componentName.dashed +
              '/' +
              componentName.dashed +
              '.js'
          ),
          {
            name: componentName.raw,
            nameDashed: componentName.dashed,
            nameCamel: componentName.camel,
            nameSnake: componentName.snaked
          }
        );
      }
    }

    // Add Twig File
    this.fs.copyTpl(
      this.templatePath('name.twig'),
      this.destinationPath(
        'components/_patterns/' +
          componentBase +
          '/' +
          componentName.dashed +
          '/' +
          componentName.dashed +
          '.twig'
      ),
      {
        name: componentName.raw,
        nameDashed: componentName.dashed,
        nameCamel: componentName.camel,
        nameSnake: componentName.snaked
      }
    );

    // Add SCSS File
    this.fs.copyTpl(
      this.templatePath('_name.scss'),
      this.destinationPath(
        'components/_patterns/' +
          componentBase +
          '/' +
          componentName.dashed +
          '/' +
          componentName.dashed +
          '.scss'
      ),
      {
        name: componentName.raw,
        nameDashed: componentName.dashed,
        nameCamel: componentName.camel,
        nameSnake: componentName.snaked
      }
    );

    // Add yaml File
    this.fs.copyTpl(
      this.templatePath('name.yml'),
      this.destinationPath(
        'components/_patterns/' +
          componentBase +
          '/' +
          componentName.dashed +
          '/' +
          componentName.dashed +
          '.yml'
      ),
      {
        name: componentName.raw,
        nameDashed: componentName.dashed,
        nameCamel: componentName.camel,
        nameSnake: componentName.snaked
      }
    );
  }

  install() {
    this.log('Created ' + this.props.name);
  }
};
