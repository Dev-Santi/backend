import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Debug", false)
  .option("-p <port>", "Port", 9091)
  .option("--mode <mode>", "Mode", "dev")
  .requiredOption("-u <user>", "User", "user");

program.parse();

export default program;
