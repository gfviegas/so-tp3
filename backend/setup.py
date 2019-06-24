from setuptools import setup

setup(
    name='fssim',
    version='1.0.0',
    packages=['api'],
    include_package_data=True,
    install_requires=[
        'numpy',
        'flask',
        'flask-restful',
        'redis',
        'python-dotenv'
    ],
)
