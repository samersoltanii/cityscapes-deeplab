import numpy as np

CITYSCAPES_COLORS = np.array([
    [128, 64,128],[244, 35,232],[ 70, 70, 70],[102,102,156],[190,153,153],
    [153,153,153],[250,170, 30],[220,220,  0],[107,142, 35],[152,251,152],
    [ 70,130,180],[220, 20, 60],[255,  0,  0],[  0,  0,142],[  0,  0, 70],
    [  0, 60,100],[  0, 80,100],[  0,  0,230],[119, 11, 32],[  0,  0,142],
    [  0,  0, 70],[  0, 60,100],[  0,  0, 90],[  0,  0,110],[  0, 80,100],
    [128, 64,255],[  0,  0,192],[  0,  0,  0],[ 64,  0,  0],[  0,128,  0],
    [128,128,  0],[  0,  0,128],[128,  0,128],[  0,128,128]
], dtype=np.uint8)

CITYSCAPES_LABELS = [
    'unlabeled','ego vehicle','rectif. border','out of roi','static',
    'dynamic','ground','road','sidewalk','parking','rail track','building',
    'wall','fence','guard rail','bridge','tunnel','pole','polegroup',
    'traffic light','traffic sign','vegetation','terrain','sky','person',
    'rider','car','truck','bus','caravan','trailer','train','motorcycle','bicycle'
]

def class_to_rgb(class_map: np.ndarray) -> np.ndarray:
    rgb = np.zeros((*class_map.shape, 3), dtype=np.uint8)
    for cls_id, color in enumerate(CITYSCAPES_COLORS):
        rgb[class_map == cls_id] = color
    return rgb

def get_class_percentages(class_map: np.ndarray) -> dict:
    total = class_map.size
    result = {}
    for cls_id, label in enumerate(CITYSCAPES_LABELS):
        count = int((class_map == cls_id).sum())
        if count > 0:
            result[label] = round(count / total * 100, 2)
    return dict(sorted(result.items(), key=lambda x: x[1], reverse=True))