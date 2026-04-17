def class_to_rgb(class_map):
    # Define a color map for the classes
    color_map = [
        (0, 0, 0),        # Background
        (128, 64, 128),   # Class 1
        (244, 35, 232),   # Class 2
        (70, 70, 70),     # Class 3
        (102, 102, 156),  # Class 4
        (190, 153, 153),  # Class 5
        (153, 153, 153),  # Class 6
        (250, 170, 30),   # Class 7
        (220, 220, 0),    # Class 8
        (107, 142, 35),   # Class 9
        (152, 251, 152),  # Class 10
        (70, 130, 180),   # Class 11
        (220, 20, 60),    # Class 12
        (255, 0, 0),      # Class 13
        (0, 0, 255),      # Class 14
        (0, 255, 255),    # Class 15
        (0, 0, 0),        # Class 16
        (0, 0, 0),        # Class 17
        (0, 0, 0),        # Class 18
        (0, 0, 0),        # Class 19
        (0, 0, 0),        # Class 20
        (0, 0, 0),        # Class 21
        (0, 0, 0),        # Class 22
        (0, 0, 0),        # Class 23
        (0, 0, 0),        # Class 24
        (0, 0, 0),        # Class 25
        (0, 0, 0),        # Class 26
        (0, 0, 0),        # Class 27
        (0, 0, 0),        # Class 28
        (0, 0, 0),        # Class 29
        (0, 0, 0),        # Class 30
        (0, 0, 0),        # Class 31
        (0, 0, 0),        # Class 32
        (0, 0, 0),        # Class 33
    ]
    
    # Convert class indices to RGB colors
    rgb_image = Image.new("RGB", (class_map.shape[1], class_map.shape[0]))
    for class_index in range(len(color_map)):
        rgb_image.putdata([(color_map[class_index] if pixel == class_index else (0, 0, 0)) for pixel in class_map.flatten()])
    
    return rgb_image


def get_class_percentages(class_map):
    unique, counts = np.unique(class_map, return_counts=True)
    total_pixels = class_map.size
    percentages = {int(cls): (count / total_pixels) * 100 for cls, count in zip(unique, counts)}
    return percentages