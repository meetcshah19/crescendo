from scipy.io import wavfile
from math import sqrt
import sys

values = []
path_to_file = sys.argv[1]

def Nmaxelements(list1, N):
    final_list = []

    for i in range(0, N):
        max1 = 0

        for j in range(len(list1)):
            if list1[j] > max1:
                max1 = list1[j]

        list1.remove(max1)
        final_list.append(max1)

    print(final_list)


def calc_rms(a):
    curr = 0
    for i in a:
        curr += (int(i[0]) ** 2)
    curr /= len(a)
    curr = sqrt(curr)
    return int(curr)


def generate_file(name):
    stemValues = []
    samplerate, data = wavfile.read(path_to_file + name + '.wav')
    f = open(path_to_file + name + '.txt', 'w')
    skip = int(samplerate / 24)
    high = 0
    for i in range(0, len(data), skip):
        curr = 0
        try:
            curr = calc_rms(data[i:i+skip])
        except:
            curr = calc_rms(data[i:len(data)])
        
        if high < curr:
            high = curr
        values.append(curr)
        stemValues.append(curr)
    stemValues.insert(0, high)
    for value in stemValues:
        f.write(str(value) + '\n')
    print(Nmaxelements(values, 100))
    f.close()


files = ['bass', 'drums', 'other']
# files = ['bass']

for a in files:
    generate_file(a)
