import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";

const HOST = "127.0.0.1";
const PORT = 3000;

function waitForServerReady(proc, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout aguardando inicialização do servidor."));
    }, timeoutMs);

    const onData = (data) => {
      const text = data.toString();
      if (text.includes("Servidor escutando")) {
        clearTimeout(timeout);
        proc.stdout?.off("data", onData);
        resolve();
      }
    };

    proc.stdout?.on("data", onData);
    proc.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Servidor encerrou antes de iniciar. Código: ${code}`));
    });
  });
}

function httpGet(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: HOST, port: PORT, path }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });

    req.on("error", reject);
  });
}

test("smoke: servidor sobe e entrega index.html", async () => {
  const proc = spawn("node", ["src/servidor.js"], {
    env: {
      ...process.env,
      porta: String(PORT),
      NODE_ENV: "test",
      SKIP_DB: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForServerReady(proc);
    const response = await httpGet("/index.html");

    assert.equal(response.statusCode, 200, "Esperava status 200");
    assert.ok(
      response.body.includes("<!DOCTYPE html>") || response.body.includes("<html"),
      "Esperava HTML válido"
    );
  } finally {
    proc.kill("SIGTERM");
  }
});
