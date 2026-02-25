// ============================================================
// CRT Terminal Background — tiled panes with different content
// types: IRC chat, sysinfo, processes, logs, ASCII art, etc.
// All monochrome green like an old phosphor monitor.
// ============================================================

const GREEN = "#00FF41";
const GREEN_DIM = "#00aa2a";
const GREEN_FAINT = "#005a15";
const GREEN_BRIGHT = "#33ff66";

// ---- Content generators ----

const IRC_NICKS = [
  "xf0rc3", "n3ur0n", "d4t4flux", "qu4ntum", "r00tkit",
  "sys0p", "h4ckflow", "z3r0day", "byteshift", "c0d3x",
  "kernel_", "nullref", "deepnet", "sigterm", "m4lware",
  "gh0stpid", "cr4ck3n", "overfl0w", "netrunr", "t3nsor",
];

const IRC_MESSAGES = [
  "anyone running the new kernel yet?",
  "just pushed a fix for the memory leak",
  "check out this exploit PoC lmao",
  "segfault in line 847 again...",
  "finally got CUDA working on wayland",
  "the model converged after 200 epochs",
  "who's got access to the A100 cluster?",
  "running inference at 120 tok/s now",
  "backtest shows 2.3 sharpe on SPY",
  "merged the PR, tests passing",
  "ROCm 6.2 just dropped",
  "try setting learning_rate=3e-4",
  "that CVE is nasty, patch asap",
  "dockerizing the pipeline tonight",
  "latency down to 0.3ms per tick",
  "the lstm is overfitting hard",
  "need to add dropout before fc layer",
  "anyone else seeing OOM on batch=64?",
  "switching to bfloat16, much faster",
  "git rebase --onto main feature/eeg",
  "loss: 0.0234 | acc: 97.8%",
  "kafka consumer lag is growing",
  "just hit 1M requests served",
  "^^^ nice, what's the p99 latency?",
  "about 12ms under load",
  "deploying v3.2.1 to staging",
  "pytest -x passed, 847 tests green",
  "the attention heads are beautiful",
  "grad norm exploded, clipping at 1.0",
  "anyone want to team for hacklytics?",
];

const LOG_LINES = [
  "[INFO]  2026-02-24 03:14:07 — Server started on :8080",
  "[INFO]  2026-02-24 03:14:08 — Connected to PostgreSQL",
  "[INFO]  2026-02-24 03:14:08 — Redis pool initialized (16)",
  "[WARN]  2026-02-24 03:14:12 — Slow query: 234ms SELECT",
  "[INFO]  2026-02-24 03:14:15 — Worker 3 processing batch",
  "[INFO]  2026-02-24 03:14:18 — Model v3.2.1 loaded (1.2GB)",
  "[INFO]  2026-02-24 03:14:19 — Inference ready, GPU mem: 4.2GB",
  "[DEBUG] 2026-02-24 03:14:22 — Cache hit ratio: 94.7%",
  "[INFO]  2026-02-24 03:14:25 — Request #12847 processed",
  "[INFO]  2026-02-24 03:14:28 — Healthcheck OK (12ms)",
  "[WARN]  2026-02-24 03:14:31 — Memory usage: 78%",
  "[INFO]  2026-02-24 03:14:33 — Batch 445/1000 | loss: 0.0312",
  "[INFO]  2026-02-24 03:14:36 — Checkpoint saved: epoch_23",
  "[INFO]  2026-02-24 03:14:38 — WebSocket: 34 active conns",
  "[DEBUG] 2026-02-24 03:14:40 — GC pause: 2.1ms",
  "[INFO]  2026-02-24 03:14:42 — Rate limit: 847/1000 rpm",
  "[INFO]  2026-02-24 03:14:44 — Kafka offset: 12847/12900",
  "[ERROR] 2026-02-24 03:14:47 — Timeout: upstream 5.2s",
  "[INFO]  2026-02-24 03:14:48 — Retry succeeded (attempt 2)",
  "[INFO]  2026-02-24 03:14:50 — Feature extraction: 847 dims",
  "[INFO]  2026-02-24 03:14:53 — Prediction: risk=0.23 [LOW]",
  "[DEBUG] 2026-02-24 03:14:55 — Token count: 3847",
  "[INFO]  2026-02-24 03:14:58 — Pipeline stage 3/5 complete",
  "[INFO]  2026-02-24 03:15:01 — Sharpe ratio: 2.31 (live)",
  "[WARN]  2026-02-24 03:15:03 — Position limit 80% reached",
];

const PROCESS_LIST = [
  "  PID USER     %CPU %MEM    VSZ   RSS COMMAND",
  " 1247 root      0.3  2.1 842120 34520 python train.py",
  " 1389 root     89.2 45.3 12.4G  7.2G cuda_inference",
  " 1456 john      2.1  0.4  42120  6520 fastapi serve",
  " 1523 john      0.1  0.2  12840  3280 redis-server",
  " 1678 root      1.4  1.2 324500 19840 kafka-broker",
  " 1892 john      0.8  0.3  18420  4120 celery worker",
  " 2034 john     12.4  8.7  4.2G  1.4G torch.distributed",
  " 2156 root      0.2  0.1   8420  1680 nginx: master",
  " 2201 www       0.4  0.1   9840  2040 nginx: worker",
  " 2345 john      3.2  2.1 642000 34200 node next-dev",
  " 2456 john      0.1  0.0   4520   840 tmux: server",
  " 2567 root      0.0  0.1  12400  1920 sshd: john",
  " 2678 john     45.6 12.3  8.4G  2.0G rocm_smi_lib",
  " 2789 john      0.3  0.1  15200  2340 git fetch --all",
  " 2890 john      8.7  3.4  1.2G 558M  pytest -x tests/",
];

const SYSINFO_LINES = [
  "┌─────────── System Monitor ───────────┐",
  "│ Host: gpu-node-03.cluster.internal   │",
  "│ OS:   Ubuntu 22.04.3 LTS (Jammy)    │",
  "│ Kern: 6.2.0-39-generic              │",
  "│ Up:   14 days, 7:23:41              │",
  "├─────────── CPU ──────────────────────┤",
  "│ AMD EPYC 7763 64-Core (128T)        │",
  "│ Load: 12.4  8.7  6.2                │",
  "│ Freq: 2450 MHz / 3500 MHz boost     │",
  "│ ███████████░░░░░░░░░  47.2%         │",
  "├─────────── Memory ───────────────────┤",
  "│ RAM:  98.4G / 256G                  │",
  "│ ██████████████░░░░░░  38.4%         │",
  "│ Swap: 2.1G / 32G                    │",
  "├─────────── GPU ──────────────────────┤",
  "│ AMD MI300X (192GB HBM3)             │",
  "│ Util: ████████████████░░ 89%        │",
  "│ VRAM: 156G / 192G                   │",
  "│ Temp: 72°C  Fan: 65%               │",
  "│ Power: 650W / 750W TDP              │",
  "├─────────── Network ──────────────────┤",
  "│ eth0: 10.0.4.23  ▲ 847 MB/s        │",
  "│ eth1: 192.168.1.103  ▼ 234 MB/s    │",
  "│ Ports: 8080 8443 5432 6379 9092     │",
  "├─────────── Disk ─────────────────────┤",
  "│ /dev/nvme0: 1.8T / 3.8T (SSD)      │",
  "│ ██████████░░░░░░░░░░  47.4%         │",
  "│ IO: R 1.2GB/s  W 890MB/s           │",
  "└──────────────────────────────────────┘",
];

const NETWORK_LINES = [
  "Proto Local Address      Foreign Address    State",
  "tcp   0.0.0.0:8080       0.0.0.0:*          LISTEN",
  "tcp   0.0.0.0:5432       0.0.0.0:*          LISTEN",
  "tcp   0.0.0.0:6379       0.0.0.0:*          LISTEN",
  "tcp   0.0.0.0:9092       0.0.0.0:*          LISTEN",
  "tcp   10.0.4.23:8080     10.0.4.1:52341     ESTABLISHED",
  "tcp   10.0.4.23:8080     10.0.4.1:52342     ESTABLISHED",
  "tcp   10.0.4.23:8080     10.0.4.7:48923     ESTABLISHED",
  "tcp   10.0.4.23:5432     10.0.4.23:41256    ESTABLISHED",
  "tcp   10.0.4.23:9092     10.0.4.12:39847    ESTABLISHED",
  "tcp   10.0.4.23:22       73.162.45.87:61234 ESTABLISHED",
  "udp   0.0.0.0:123        0.0.0.0:*          ",
  "",
  "Active connections: 47  |  Packets: ▲ 12.4K/s ▼ 8.7K/s",
  "Bandwidth: ▲ 847 Mbit/s  ▼ 234 Mbit/s",
];

const ASCII_ART = [
  "                                            ",
  "     ██╗██████╗     ██████╗ ██╗██╗     ███████╗██╗   ██╗",
  "     ██║██╔══██╗    ██╔══██╗██║██║     ██╔════╝╚██╗ ██╔╝",
  "     ██║██████╔╝    ██████╔╝██║██║     █████╗   ╚████╔╝ ",
  "██   ██║██╔══██╗    ██╔══██╗██║██║     ██╔══╝    ╚██╔╝  ",
  "╚█████╔╝██║  ██║    ██║  ██║██║███████╗███████╗   ██║   ",
  " ╚════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝   ╚═╝   ",
  "                                            ",
  " ╔══════════════════════════════════════════════╗",
  " ║  Computer Engineering @ University of Florida ║",
  " ║  ML Researcher | Quant Dev | Hackathon Winner ║",
  " ╚══════════════════════════════════════════════╝",
  "                                            ",
  "  [  system online  ]  [  all services nominal  ]",
  "                                            ",
  "  $ uptime",
  "  03:14:07 up 14 days, 7:23, 3 users, load avg: 12.4",
  "                                            ",
  "  $ fortune",
  '  "The best way to predict the future is to',
  '   implement it." — David Heinemeier Hansson',
];

const FILE_TREE = [
  "visitor@portfolio:~/projects$ tree -L 2",
  ".",
  "├── autoimmune-risk-analysis/",
  "│   ├── models/",
  "│   ├── src/",
  "│   ├── tests/",
  "│   ├── Dockerfile",
  "│   └── README.md",
  "├── adjourned/",
  "│   ├── agents/",
  "│   ├── frontend/",
  "│   ├── pipelines/",
  "│   └── azure-deploy.yaml",
  "├── lawgorithm/",
  "│   ├── rocm/",
  "│   ├── adk_agents/",
  "│   ├── inference/",
  "│   └── benchmarks/",
  "├── agent-zero/",
  "│   ├── detection/",
  "│   ├── gemini/",
  "│   ├── models/",
  "│   └── api/",
  "├── algogators-strategies/",
  "│   ├── backtest/",
  "│   ├── signals/",
  "│   ├── data/",
  "│   └── live/",
  "└── eeg-seizure-prediction/",
  "    ├── preprocessing/",
  "    ├── models/",
  "    ├── notebooks/",
  "    └── results/",
  "",
  "24 directories, 187 files",
];

const GIT_LOG = [
  "visitor@dev:~/projects$ git log --oneline --graph -20",
  "* a3f8d2c (HEAD -> main) feat: add attention layer to EEG model",
  "* 1b7e4a9 fix: memory leak in data loader pipeline",
  "* 8c2f1d3 perf: optimize inference batch processing",
  "* 4e9a7b6 feat: implement real-time signal filtering",
  "* 2d1c8f5 docs: update API endpoint documentation",
  "* 7f3b2e1 test: add integration tests for risk API",
  "* 9a4d6c8 feat: add ROCm kernel for matrix multiply",
  "* 3e7f1a2 fix: correct sharpe ratio calculation",
  "* 6b8c4d9 feat: implement order book data structure",
  "* 1f2a3b4 refactor: extract feature engineering module",
  "* 5c9e7d1 feat: add DSPy optimization pipeline",
  "* 8d3f2a6 chore: update dependencies and lock file",
  "* 2a1b4c7 feat: implement fraud scoring model",
  "* 4f6e8d2 fix: handle edge case in tokenizer",
  "* 7c5a1b9 perf: reduce latency to <1ms per tick",
  "* 3d8f4e1 feat: add backtesting framework v2",
  "* 9b2c6a4 test: add unit tests for signal processor",
  "* 1e4d7f8 feat: implement LSTM seizure predictor",
  "* 5a3b9c2 init: project scaffold and CI/CD setup",
];

// ---- Pane types ----

type PaneType = "irc" | "logs" | "sysinfo" | "procs" | "ascii" | "files" | "network" | "gitlog";

interface Pane {
  x: number;
  y: number;
  w: number;
  h: number;
  type: PaneType;
  title: string;
  lines: string[];
  scrollOffset: number;
  scrollSpeed: number; // ms per new line
  lastScroll: number;
  borderColor: string;
}

export function createMatrixRain(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let animationId: number;
  let panes: Pane[] = [];
  let frame = 0;
  const FONT_SIZE = 11;
  const LINE_H = 14;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildLayout();
  }

  function buildLayout() {
    panes = [];
    const W = canvas.width;
    const H = canvas.height;

    // Adaptive grid: 3 columns on wide screens, 2 on narrow
    const isWide = W > 900;
    const isTall = H > 700;

    if (isWide) {
      // 3 columns, multiple rows — like the CRT photo
      const c1 = W * 0.35;
      const c2 = W * 0.35;
      const c3 = W * 0.30;
      const r1 = H * (isTall ? 0.40 : 0.50);
      const r2 = H * (isTall ? 0.30 : 0.50);
      const r3 = isTall ? H * 0.30 : 0;

      // Row 1
      addPane(0, 0, c1, r1, "irc", "#dev-general — irssi");
      addPane(c1, 0, c2, r1 * 0.55, "sysinfo", "System Monitor");
      addPane(c1, r1 * 0.55, c2, r1 * 0.45, "procs", "htop — processes");
      addPane(c1 + c2, 0, c3, r1, "ascii", "MOTD");

      // Row 2
      addPane(0, r1, c1, r2, "logs", "journalctl -f");
      addPane(c1, r1, c2, r2, "gitlog", "git log --graph");
      addPane(c1 + c2, r1, c3, r2, "network", "netstat -an");

      // Row 3 (tall screens)
      if (isTall && r3 > 100) {
        addPane(0, r1 + r2, c1 + c2, r3, "files", "~/projects");
        addPane(c1 + c2, r1 + r2, c3, r3, "logs", "train.log");
      }
    } else {
      // 2 columns for mobile/narrow
      const half = W * 0.5;
      const r1 = H * 0.5;
      addPane(0, 0, half, r1, "irc", "#dev-general");
      addPane(half, 0, half, r1, "sysinfo", "System Monitor");
      addPane(0, r1, half, H - r1, "logs", "journalctl -f");
      addPane(half, r1, half, H - r1, "gitlog", "git log");
    }
  }

  function addPane(x: number, y: number, w: number, h: number, type: PaneType, title: string) {
    let lines: string[];
    let scrollSpeed: number;

    switch (type) {
      case "irc":
        lines = generateIRCLines(60);
        scrollSpeed = 1800 + Math.random() * 1200;
        break;
      case "logs":
        lines = [...LOG_LINES, ...LOG_LINES, ...LOG_LINES];
        scrollSpeed = 600 + Math.random() * 400;
        break;
      case "sysinfo":
        lines = [...SYSINFO_LINES];
        scrollSpeed = 0; // static
        break;
      case "procs":
        lines = [...PROCESS_LIST];
        scrollSpeed = 2000 + Math.random() * 1000;
        break;
      case "ascii":
        lines = [...ASCII_ART];
        scrollSpeed = 0; // static
        break;
      case "files":
        lines = [...FILE_TREE];
        scrollSpeed = 0;
        break;
      case "network":
        lines = [...NETWORK_LINES];
        scrollSpeed = 3000 + Math.random() * 2000;
        break;
      case "gitlog":
        lines = [...GIT_LOG];
        scrollSpeed = 0;
        break;
    }

    panes.push({
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(w),
      h: Math.round(h),
      type,
      title,
      lines,
      scrollOffset: 0,
      scrollSpeed,
      lastScroll: 0,
      borderColor: GREEN_DIM,
    });
  }

  function generateIRCLines(count: number): string[] {
    const lines: string[] = [];
    const hours = [1, 2, 3, 3, 3, 3, 3, 3];
    for (let i = 0; i < count; i++) {
      const h = hours[Math.floor(Math.random() * hours.length)];
      const m = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      const nick = IRC_NICKS[Math.floor(Math.random() * IRC_NICKS.length)];
      const msg = IRC_MESSAGES[Math.floor(Math.random() * IRC_MESSAGES.length)];
      lines.push(`${String(h).padStart(2, "0")}:${m} <${nick}> ${msg}`);
    }
    return lines;
  }

  function draw(now: number) {
    // Clear to solid black (no trails)
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    frame++;

    for (const pane of panes) {
      drawPane(pane, now);
    }

    animationId = requestAnimationFrame(draw);
  }

  function drawPane(p: Pane, now: number) {
    ctx.save();

    // Clip to pane bounds
    ctx.beginPath();
    ctx.rect(p.x, p.y, p.w, p.h);
    ctx.clip();

    // Pane background
    ctx.fillStyle = "rgba(5, 10, 5, 0.95)";
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Border
    ctx.strokeStyle = GREEN_FAINT;
    ctx.lineWidth = 1;
    ctx.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);

    // Title bar
    const titleH = 16;
    ctx.fillStyle = "rgba(0, 255, 65, 0.06)";
    ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, titleH);

    ctx.font = `bold ${FONT_SIZE}px "JetBrains Mono", "Cascadia Code", monospace`;
    ctx.fillStyle = GREEN_DIM;
    ctx.fillText(` ${p.title}`, p.x + 4, p.y + 12);

    // Divider under title
    ctx.strokeStyle = GREEN_FAINT;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + titleH);
    ctx.lineTo(p.x + p.w, p.y + titleH);
    ctx.stroke();

    // Scrolling logic
    if (p.scrollSpeed > 0 && now - p.lastScroll > p.scrollSpeed) {
      p.lastScroll = now;
      p.scrollOffset++;

      // Add new content for IRC and logs
      if (p.type === "irc") {
        const h = String(3).padStart(2, "0");
        const m = String(Math.floor(Math.random() * 60)).padStart(2, "0");
        const nick = IRC_NICKS[Math.floor(Math.random() * IRC_NICKS.length)];
        const msg = IRC_MESSAGES[Math.floor(Math.random() * IRC_MESSAGES.length)];
        p.lines.push(`${h}:${m} <${nick}> ${msg}`);
      } else if (p.type === "logs") {
        p.lines.push(LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]);
      } else if (p.type === "procs") {
        // Shuffle CPU values
        const idx = 1 + Math.floor(Math.random() * (PROCESS_LIST.length - 1));
        const line = PROCESS_LIST[idx];
        if (line) {
          p.lines.push(line.replace(/\d+\.\d/, () => (Math.random() * 90).toFixed(1)));
        }
      } else if (p.type === "network") {
        p.lines.push(NETWORK_LINES[Math.floor(Math.random() * NETWORK_LINES.length)]);
      }
    }

    // Render lines
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", "Cascadia Code", monospace`;
    const contentY = p.y + titleH + 4;
    const maxLines = Math.floor((p.h - titleH - 8) / LINE_H);
    const startIdx = p.scrollSpeed > 0
      ? Math.max(0, p.lines.length - maxLines)
      : 0;

    for (let i = 0; i < maxLines && (startIdx + i) < p.lines.length; i++) {
      const line = p.lines[startIdx + i];
      const ly = contentY + i * LINE_H + LINE_H;
      drawLine(line, p.x + 6, ly, p.type, p.w - 12);
    }

    ctx.restore();
  }

  function drawLine(text: string, x: number, y: number, type: PaneType, maxW: number) {
    // Truncate if too long
    const charW = FONT_SIZE * 0.6;
    const maxChars = Math.floor(maxW / charW);
    const truncated = text.length > maxChars ? text.substring(0, maxChars) : text;

    switch (type) {
      case "irc":
        drawIRCLine(truncated, x, y);
        break;
      case "logs":
        drawLogLine(truncated, x, y);
        break;
      case "sysinfo":
        drawSysLine(truncated, x, y);
        break;
      default:
        // Everything else: monochrome green
        ctx.fillStyle = GREEN_DIM;
        ctx.fillText(truncated, x, y);
        break;
    }
  }

  function drawIRCLine(text: string, x: number, y: number) {
    // Format: "HH:MM <nick> message"
    const match = text.match(/^(\d{2}:\d{2})\s(<\w+>)\s(.*)$/);
    if (match) {
      const [, time, nick, msg] = match;
      ctx.fillStyle = GREEN_FAINT;
      ctx.fillText(time + " ", x, y);
      const timeW = ctx.measureText(time + " ").width;

      ctx.fillStyle = GREEN_BRIGHT;
      ctx.fillText(nick + " ", x + timeW, y);
      const nickW = ctx.measureText(nick + " ").width;

      ctx.fillStyle = GREEN_DIM;
      ctx.fillText(msg, x + timeW + nickW, y);
    } else {
      ctx.fillStyle = GREEN_DIM;
      ctx.fillText(text, x, y);
    }
  }

  function drawLogLine(text: string, x: number, y: number) {
    if (text.includes("[ERROR]")) {
      ctx.fillStyle = GREEN_BRIGHT;
      ctx.font = `bold ${FONT_SIZE}px "JetBrains Mono", "Cascadia Code", monospace`;
      ctx.fillText(text, x, y);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", "Cascadia Code", monospace`;
    } else if (text.includes("[WARN]")) {
      ctx.fillStyle = GREEN;
      ctx.fillText(text, x, y);
    } else if (text.includes("[DEBUG]")) {
      ctx.fillStyle = GREEN_FAINT;
      ctx.fillText(text, x, y);
    } else {
      ctx.fillStyle = GREEN_DIM;
      ctx.fillText(text, x, y);
    }
  }

  function drawSysLine(text: string, x: number, y: number) {
    // Box drawing chars and bars get bright treatment
    if (text.includes("█") || text.includes("┌") || text.includes("├") || text.includes("└") || text.includes("╗") || text.includes("═")) {
      ctx.fillStyle = GREEN;
      ctx.fillText(text, x, y);
    } else if (text.includes("%") || text.includes("°C") || text.includes("MHz")) {
      ctx.fillStyle = GREEN_DIM;
      ctx.fillText(text, x, y);
    } else {
      ctx.fillStyle = GREEN_DIM;
      ctx.fillText(text, x, y);
    }
  }

  function start() {
    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);
  }

  function stop() {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
  }

  return { start, stop };
}
