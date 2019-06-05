from setuptools import setup

setup(
    name='fssim',
    packages=['api'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask-restful',
        'redis',
        'python-dotenv'
    ],
)
