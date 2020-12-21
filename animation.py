import bpy
import sys


# setup configuration
bpy.context.scene.render.engine = 'CYCLES'
bpy.data.scenes['Scene'].cycles.device = 'GPU'

cam = bpy.data.objects['Camera']
cam.data.type = 'PANO'
cam.data.cycles.panorama_type = 'EQUIRECTANGULAR'

bpy.data.scenes['Scene'].render.resolution_x = 2160
bpy.data.scenes['Scene'].render.resolution_y = 1080

bpy.context.scene.render.image_settings.file_format = 'FFMPEG'
bpy.context.scene.render.ffmpeg.format = 'MPEG4'

bpy.data.scenes['Scene'].frame_start = 1

# returns a list of amplitudes from the text stem file
def getAmplitudeList(path):
    f = open(path, 'r')
    a = f.read().splitlines()
    final = [int(num) for num in a]

    max_num = final[0]
    final.pop(0)
    final_list = [(elem/max_num) for elem in final]
    return final_list

# scale animation
sphere = bpy.data.objects['Sphere']
amplitudes = getAmplitudeList("crescendo/drums.txt")
bpy.data.scenes['Scene'].frame_end = len(amplitudes)
loop = 0
factor = 0
for val in amplitudes:
    if val < 0.1:
        val = 0

    if factor < val:
        factor = val
    else:
        factor = factor - (factor / 10.00)
    print(factor)
    loop = loop + 1
    sphere.scale.x += factor*10
    sphere.scale.y += factor*10
    sphere.scale.z += factor*10
    sphere.keyframe_insert(data_path='scale', frame=loop)
    sphere.scale.x -= factor*10
    sphere.scale.y -= factor*10
    sphere.scale.z -= factor*10


# water animation
water = bpy.data.objects['Plane']

amplitudes = getAmplitudeList("crescendo/bass.txt")
loop = 0
factor = 0
for val in amplitudes:
    if val < 0.1:
        val = 0

    if factor < val:
        factor = val
    else:
        factor = factor - (factor / 10.00)

    print(val)
    loop = loop + 1
    water.modifiers['Displace'].strength += val*10
    water.keyframe_insert(
        data_path='modifiers["Displace"].strength', frame=loop)
    water.modifiers['Displace'].strength -= val*10

# particle animation
particles = bpy.data.objects['Plane.001']
amplitudes = getAmplitudeList("crescendo/other.txt")
loop = 0
factor = 0
for val in amplitudes:
    if val < 0.1:
        val = 0

    if factor < val:
        factor = val
    else:
        factor = factor - (factor / 10.00)
    print(val)
    loop = loop + 1
    var = "rules[\"Average Speed\"].speed"
    particles.particle_systems['ParticleSettings'].settings.boids.air_speed_max = val * 10
    particles.particle_systems['ParticleSettings'].settings.boids.keyframe_insert('air_speed_max',frame=loop)
