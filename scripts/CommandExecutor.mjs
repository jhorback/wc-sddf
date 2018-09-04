
import "colors";

export class CommandExecutor {
    constructor(defaultEnv) {
      this.commands = {};
      this.options = {};
      this.flags = {};
      this.env = defaultEnv || {};
      this.env._ = [];
      this.addHelpCommand();
    }
  
    addCommand(name, {help, execute, updateEnv = null}) {
      const command = {name, updateEnv, execute, help};
      command.helpLabel = `${command.name}`.bold;
      this.commands[name] = command;
    }
  
    addHelpCommand() {
      
      this.addCommand("help", {
        help: "Shows this help message",
        execute: () => {          
          let longestLabelLenth = getLongestLabelLenth(this);

          console.log("\nAvailable Commands\n".bold);
          const sortedCommands = Object.values(this.commands).sort(commandSort);
          sortedCommands.forEach((command) => 
            console.log(`${padLabel(command.helpLabel)} ${command.help}`));

          console.log("\nOptions\n".bold);
          const sortedOptions = Object.values(this.options).sort(optionSort);
          sortedOptions.forEach((option) =>
            console.log(`${padLabel(option.helpLabel)} ${option.help}`));
          console.log("\n");

          function padLabel(label) {
            const padding = longestLabelLenth - label.length;
            // String.padEnd not working?
            return `  ${label}${Array(padding + 1).join(' ')}  `;

          }
        }
      });        
    }
  
    addOption(name, {
        help,
        flag = null,
        defaultValue = null,
        updateEnv
      }) {
      const option = {flag, name, updateEnv, defaultValue, help};
      option.helpLabel = `${option.flag ? `-${option.flag}, ` : ""}--${option.name}`.bold;
      
      this.options[`--${name}`] = option;
  
      if (flag) {
        this.flags[`-${flag}`] = option;
      }
  
      if (defaultValue !== null) {
        this.env[name] = defaultValue;
      }
    }
  
    execute(beforeExecute) {
      const [,, commandName, ...args] = process.argv;
      let command = this.commands[commandName];
  
      if (!command) {
        console.log(`\nCommand ${commandName || ""} is not supported`.red);
        command = this.commands.help;
        beforeExecute = null;
      }
      
      command.updateEnv && command.updateEnv(this.env);
      args.forEach((arg) => {
        const option = this.options[arg] || this.flags[arg];
        if (option && option.updateEnv) {
          option.updateEnv(this.env);
        } else {
          this.env._.push(arg);
        }
      });

      if (this.env._.length > 0) {
        console.warn(`Option(s) not supported: ${this.env._.join(", ")}`.yellow);
      }
  
      beforeExecute &&
        beforeExecute(commandName, this.env);
      command.execute(this.env);
    }
  }



function optionSort(opta, optb) {
  return alphaNumericSort(getOptSortKey(opta), getOptSortKey(optb));

  function getOptSortKey(opt) {
    return opt.flag ? `${opt.flag}` : `0 ${opt.name}`;
  }
}

function commandSort(c1, c2) {
  return alphaNumericSort(c1.name, c2.name);
}

function alphaNumericSort (a, b) {
  if (a === b) {
      return 0;
  }
  if (typeof a === typeof b) {
      return a < b ? -1 : 1;
  }
  return typeof a < typeof b ? -1 : 1;
}

function getLongestLabelLenth(ce) {
  let items = Object.values(ce.commands).concat(Object.values(ce.options));
  return Math.max(...items.map(i => i.helpLabel.length));
}
