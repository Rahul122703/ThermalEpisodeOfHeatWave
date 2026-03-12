from tensorflow.keras.models import load_model

_loaded_models = {}

def get_model(path):

    if path not in _loaded_models:
        _loaded_models[path] = load_model(path, compile=False)

    return _loaded_models[path]