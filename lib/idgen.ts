import md5 from "md5";

export function generate(name: string) {
  const hash = md5(name);
  return hash.replace(/[a-f]/g, (match) =>
    "10".charAt("abcdef".indexOf(match)),
  );
}
