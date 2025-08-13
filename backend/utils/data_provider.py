import pandas as pd
import numpy as np
import random

def generate_medical_data(num_records=1000):
    """
    Generates synthetic anonymized medical data for demonstration purposes.
    In a real scenario, this would be replaced with actual medical data from secure sources.
    """
    print(f"Generating {num_records} synthetic medical records...")
    
    # Set random seed for reproducibility
    np.random.seed(42)
    random.seed(42)
    
    # Define possible values for categorical variables
    age_groups = [f"{i}-{i+9}" for i in range(10, 80, 10)]
    diagnosis_codes = ["C00", "C18", "J45", "I10", "E11", "F32"]  # Example ICD-10 codes
    treatment_outcomes = ["Improved", "Stable", "Worsened"]
    
    # Generate synthetic data
    data = {
        'patient_id': range(1, num_records + 1),
        'age_group': np.random.choice(age_groups, num_records),
        'diagnosis_code': np.random.choice(diagnosis_codes, num_records),
        'treatment_outcome': np.random.choice(treatment_outcomes, num_records, p=[0.6, 0.3, 0.1]),  # Bias towards improvement
        'symptoms_count': np.random.poisson(3, num_records),  # Poisson distribution for symptom count
        'treatment_duration_days': np.random.exponential(30, num_records).astype(int) + 1,  # Exponential distribution
        'medication_count': np.random.binomial(5, 0.3, num_records) + 1,  # Binomial distribution
        'lab_results_normal': np.random.choice([True, False], num_records, p=[0.7, 0.3])
    }
    
    df = pd.DataFrame(data)
    
    # Add some correlations to make the data more realistic
    # Older patients tend to have more symptoms and longer treatment
    age_group_mapping = {group: i for i, group in enumerate(age_groups)}
    df['age_numeric'] = df['age_group'].map(age_group_mapping)
    
    # Adjust symptoms count based on age
    df['symptoms_count'] = np.clip(
        df['symptoms_count'] + df['age_numeric'] * 0.5, 
        0, 10
    ).astype(int)
    
    # Adjust treatment duration based on symptoms
    df['treatment_duration_days'] = np.clip(
        df['treatment_duration_days'] + df['symptoms_count'] * 5,
        1, 365
    ).astype(int)
    
    # Remove the temporary age_numeric column
    df = df.drop('age_numeric', axis=1)
    
    print("Medical data generation complete!")
    print(f"Data shape: {df.shape}")
    print(f"Age groups: {df['age_group'].value_counts().to_dict()}")
    print(f"Diagnosis codes: {df['diagnosis_code'].value_counts().to_dict()}")
    print(f"Treatment outcomes: {df['treatment_outcome'].value_counts().to_dict()}")
    
    return df

def save_anonymized_data(df, filename="anonymized_medical_data.csv"):
    """Saves the anonymized data to a CSV file."""
    df.to_csv(filename, index=False)
    print(f"Anonymized data saved to {filename}")

if __name__ == "__main__":
    # Generate and save sample medical data
    medical_data = generate_medical_data(1000)
    save_anonymized_data(medical_data) 