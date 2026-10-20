#!/usr/bin/env python3
"""Bundle src/ into one self-contained page.

  python3 build.py            -> index.html  (open it in any browser, works offline)
  python3 build.py --fragment OUT.html -> same page without the <html>/<head>/<body> wrapper
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'

def scripts():
    order = ['scenes.js', 'topics.js', 'plan.js']
    files = [SRC / f for f in order]
    files += sorted((SRC / 'questions').glob('*.js')) + sorted((SRC / 'lessons').glob('*.js'))
    files.append(SRC / 'app.js')
    out = []
    for f in files:
        code = f.read_text(encoding='utf-8').replace('</script', '<\\/script')
        out.append(f'<script>/* {f.relative_to(SRC)} */\n{code}\n</script>')
    return '\n'.join(out)

def fragment():
    shell = (SRC / 'shell.html').read_text(encoding='utf-8')
    return shell.replace('/*STYLE*/', (SRC / 'styles.css').read_text(encoding='utf-8')).replace('<!--SCRIPTS-->', scripts())

def page():
    frag = fragment()
    head, body = frag.split('<div class="shell">', 1)
    return ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            f'{head}</head>\n<body>\n<div class="shell">{body}</body>\n</html>\n')

if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == '--fragment':
        pathlib.Path(sys.argv[2]).write_text(fragment(), encoding='utf-8')
        print('wrote', sys.argv[2])
    else:
        (ROOT / 'index.html').write_text(page(), encoding='utf-8')
        print('wrote', ROOT / 'index.html', f'({(ROOT / "index.html").stat().st_size // 1024} KB)')
