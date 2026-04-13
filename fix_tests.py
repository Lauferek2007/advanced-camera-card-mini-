import os

for root, _, files in os.walk('tests'):
    for file in files:
        if file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            content = content.replace('advanced-camera-card-mini-', 'advanced-camera-card-')
            content = content.replace('advanced-camera-card-mini', 'advanced-camera-card')
            content = content.replace('advanced-camera-card', 'advanced-camera-card-mini')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
